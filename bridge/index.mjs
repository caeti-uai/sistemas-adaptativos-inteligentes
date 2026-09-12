import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const config = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramUsername: process.env.TELEGRAM_BOT_USERNAME ?? 'cateti2026_bot',
  buzzChannel:
    process.env.BUZZ_CHANNEL_ID ?? 'bb68c4c0-2b96-44db-8c3c-bcd09cf84d14',
  agentName: process.env.BUZZ_AGENT_NAME ?? 'CAETI Rosario',
  agentPubkey:
    process.env.BUZZ_AGENT_PUBKEY ??
    'fdc1f6b6e6ea24c99cbcffa499025ead12aef389d26979096b5d5cc57fee39bf',
  replyTimeoutMs: Number(process.env.BUZZ_REPLY_TIMEOUT_MS ?? 90000),
};

if (!config.telegramToken) {
  console.error('Falta TELEGRAM_BOT_TOKEN. Cargalo como secreto de entorno.');
  process.exit(1);
}

let running = true;
let offset = 0;
process.on('SIGINT', () => {
  running = false;
});
process.on('SIGTERM', () => {
  running = false;
});

async function telegram(method, payload = {}) {
  const response = await fetch(
    `https://api.telegram.org/bot${config.telegramToken}/${method}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    },
  );
  const result = await response.json();
  if (!response.ok || !result.ok)
    throw new Error(
      `Telegram ${method}: ${result.description ?? response.status}`,
    );
  return result.result;
}

async function buzz(args) {
  const { stdout } = await run('buzz', args, {
    env: process.env,
    maxBuffer: 4 * 1024 * 1024,
  });
  return JSON.parse(stdout);
}

async function sendTelegram(chatId, text) {
  const chunks = text.match(/[\s\S]{1,4000}/g) ?? [''];
  for (const chunk of chunks) {
    await telegram('sendMessage', {
      chat_id: chatId,
      text: chunk,
      disable_web_page_preview: true,
    });
  }
}

async function forwardToBuzz(message) {
  const author = [message.from?.first_name, message.from?.last_name]
    .filter(Boolean)
    .join(' ');
  const reference = `telegram:${message.chat.id}:${message.message_id}`;
  const content = `@${config.agentName} Consulta externa desde Telegram\n\nPersona: ${author || 'Usuario de Telegram'}\nReferencia: ${reference}\n\nPregunta:\n${message.text}`;
  const sent = await buzz([
    'messages',
    'send',
    '--channel',
    config.buzzChannel,
    '--mention',
    config.agentPubkey,
    '--content',
    content,
  ]);
  return sent.event_id;
}

async function waitForAgent(rootEventId) {
  const deadline = Date.now() + config.replyTimeoutMs;
  while (Date.now() < deadline && running) {
    const thread = await buzz([
      'messages',
      'thread',
      '--channel',
      config.buzzChannel,
      '--event',
      rootEventId,
    ]);
    const reply = thread.find(
      (event) =>
        event.pubkey === config.agentPubkey &&
        event.tags?.some((tag) => tag[0] === 'e' && tag[1] === rootEventId),
    );
    if (reply?.content) return reply.content;
    await new Promise((resolve) => setTimeout(resolve, 2500));
  }
  return null;
}

async function handleMessage(message) {
  if (message.chat.type !== 'private' || !message.text) return;
  const command = message.text.trim().split(/\s+/, 1)[0].toLowerCase();
  if (command === '/start' || command === `/start@${config.telegramUsername}`) {
    await sendTelegram(
      message.chat.id,
      'Hola. Soy el asistente de CAETI Rosario. Puedo responder consultas sobre sus líneas, proyectos, equipos, publicaciones y plataforma experimental. Tus preguntas serán procesadas en el espacio institucional de Buzz.',
    );
    return;
  }
  if (command === '/ayuda' || command === '/help') {
    await sendTelegram(
      message.chat.id,
      'Escribí una pregunta concreta sobre CAETI Rosario. Si la información disponible no alcanza, la consulta será derivada para revisión humana.',
    );
    return;
  }
  await telegram('sendChatAction', {
    chat_id: message.chat.id,
    action: 'typing',
  });
  const answer = await waitForAgent(await forwardToBuzz(message));
  await sendTelegram(
    message.chat.id,
    answer ??
      'La consulta fue recibida, pero todavía no hay una respuesta disponible. Quedó registrada para revisión.',
  );
}

async function main() {
  const identity = await telegram('getMe');
  console.log(
    `Puente activo para @${identity.username}. Presioná Ctrl+C para detenerlo.`,
  );
  while (running) {
    try {
      const updates = await telegram('getUpdates', {
        offset,
        timeout: 25,
        allowed_updates: ['message'],
      });
      for (const update of updates) {
        offset = Math.max(offset, update.update_id + 1);
        if (update.message) await handleMessage(update.message);
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

await main();
