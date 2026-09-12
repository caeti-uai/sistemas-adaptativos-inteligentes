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

El iniciador guarda el token en el Llavero de macOS con el servicio
`caeti-telegram-bridge`. No se escribe en archivos del proyecto.

El puente puede iniciarse desde un entorno autenticado de Buzz con:

```bash
TELEGRAM_BOT_TOKEN="$(security find-generic-password -a "$USER" -s caeti-telegram-bridge -w)" npm run bridge
```

Para detener el puente, presionar `Ctrl+C`.

## Ejecución persistente en macOS

La instalación persistente usa `launchd`, inicia el puente al abrir la sesión y
lo reinicia si termina con error. Los secretos se leen desde el Llavero de
macOS. En el piloto local se usa la identidad administrada de Fizz; para
producción se recomienda reemplazarla por una identidad de servicio limitada al
canal de consultas.

Archivos:

- `ejecutar-persistente.command`: carga secretos y ejecuta el puente.
- `ar.edu.uai.caeti.telegram-bridge.plist`: definición del servicio.

Los registros operativos quedan en `WORK_LOGS/CAETI_TELEGRAM_BRIDGE.*.log`.

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
