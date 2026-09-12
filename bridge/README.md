# Puente Telegram ↔ Buzz para CAETI Rosario

Prueba local por long polling. No requiere webhook ni una URL HTTPS.

## Flujo

1. Telegram recibe una consulta privada dirigida a `@cateti2026_bot`.
2. El puente abre una conversación en `CAETI 2026 · Consultas Telegram`.
3. Menciona al agente `CAETI Rosario`.
4. Espera la respuesta del agente y la devuelve a Telegram.

## Requisitos

- Node.js 22 o posterior.
- `buzz` instalado y autenticado en el entorno que ejecuta el proceso.
- El token renovado del bot cargado en `TELEGRAM_BOT_TOKEN`.
- No debe existir un webhook activo mientras se use `getUpdates`.

## Inicio seguro

Desde una terminal ubicada en la raíz del repositorio:

```bash
read -s -p "Token renovado de Telegram: " TELEGRAM_BOT_TOKEN
export TELEGRAM_BOT_TOKEN
echo
npm run bridge
```

El token queda solamente en la memoria de esa terminal. No se escribe en archivos. Para detener el puente, presionar `Ctrl+C`.

## Variables opcionales

- `TELEGRAM_BOT_USERNAME` (predeterminado: `cateti2026_bot`)
- `BUZZ_CHANNEL_ID`
- `BUZZ_AGENT_NAME`
- `BUZZ_AGENT_PUBKEY`
- `BUZZ_REPLY_TIMEOUT_MS`

## Seguridad

- Nunca guardar el token en Git, `.env` o mensajes de Buzz.
- Usar una identidad técnica de Buzz restringida al canal antes de desplegar en VPS.
- La prueba acepta únicamente mensajes privados de Telegram.
