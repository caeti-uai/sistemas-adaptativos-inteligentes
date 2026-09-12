#!/bin/zsh

set -u

SCRIPT_DIR=${0:A:h}
PROJECT_DIR="$SCRIPT_DIR/.."

TELEGRAM_BOT_TOKEN=$(security find-generic-password -a "$USER" -s caeti-telegram-bridge -w) || exit 1
BUZZ_PRIVATE_KEY=$(security find-generic-password -a "$USER" -s caeti-buzz-fizz-private-key -w) || exit 1
BUZZ_AUTH_TAG=$(security find-generic-password -a "$USER" -s caeti-buzz-fizz-auth-tag -w) || exit 1

export TELEGRAM_BOT_TOKEN
export BUZZ_PRIVATE_KEY
export BUZZ_AUTH_TAG
export BUZZ_RELAY_URL="wss://cati2026.communities.buzz.xyz"
export PATH="/Users/asartorio/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

cd "$PROJECT_DIR" || exit 1
exec /Users/asartorio/.local/bin/node bridge/index.mjs
