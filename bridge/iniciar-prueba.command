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

export TELEGRAM_BOT_TOKEN
exec npm run bridge
