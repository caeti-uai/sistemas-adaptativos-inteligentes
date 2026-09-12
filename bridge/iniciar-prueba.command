#!/bin/zsh

set -u

SCRIPT_DIR=${0:A:h}
cd "$SCRIPT_DIR/.." || exit 1

print -n "Token renovado de Telegram: "
read -rs TELEGRAM_BOT_TOKEN
print

if [[ -z "$TELEGRAM_BOT_TOKEN" ]]; then
  print "No se ingresó ningún token. La prueba no fue iniciada."
  exit 1
fi

if ! security add-generic-password -U -a "$USER" -s caeti-telegram-bridge -w "$TELEGRAM_BOT_TOKEN" >/dev/null; then
  print "No se pudo guardar el token en el Llavero de macOS."
  unset TELEGRAM_BOT_TOKEN
  exit 1
fi

unset TELEGRAM_BOT_TOKEN
print "Token guardado de forma segura en el Llavero de macOS."
print "Podés cerrar esta ventana y volver a Buzz."
