#!/bin/zsh

set -u

SERVICE_LABEL="ar.edu.uai.caeti.telegram-bridge"
SERVICE_TARGET="gui/$(id -u)/${SERVICE_LABEL}"
PROJECT_DIR="${0:A:h}/.."
STDOUT_LOG="/Users/asartorio/.buzz/WORK_LOGS/CAETI_TELEGRAM_BRIDGE.stdout.log"
STDERR_LOG="/Users/asartorio/.buzz/WORK_LOGS/CAETI_TELEGRAM_BRIDGE.stderr.log"

show_status() {
  if launchctl print "$SERVICE_TARGET" >/dev/null 2>&1; then
    local state
    state=$(launchctl print "$SERVICE_TARGET" | awk -F' = ' '/^[[:space:]]*state = / { print $2; exit }')
    print "Estado del puente: ${state:-cargado}"
  else
    print "Estado del puente: no cargado"
    print "Reiniciá tu sesión de macOS o reinstalá el servicio para recuperarlo."
    return 1
  fi
}

restart_bridge() {
  launchctl kickstart -k "$SERVICE_TARGET"
  sleep 1
  show_status
}

show_logs() {
  print "\n--- Actividad reciente ---"
  tail -n 30 "$STDOUT_LOG" 2>/dev/null || print "Todavía no hay registro de actividad."
  print "\n--- Errores recientes ---"
  tail -n 30 "$STDERR_LOG" 2>/dev/null || print "Todavía no hay registro de errores."
}

run_action() {
  case "${1:-menu}" in
    estado|status)
      show_status
      ;;
    reiniciar|restart)
      restart_bridge
      ;;
    registros|logs)
      show_logs
      ;;
    *)
      return 1
      ;;
  esac
}

cd "$PROJECT_DIR" || exit 1

if [[ $# -gt 0 ]]; then
  if ! run_action "$1"; then
    print "Uso: $0 {estado|reiniciar|registros}"
    exit 2
  fi
  exit $?
fi

print ""
print "CAETI 2026 · Control del bot Telegram–Buzz"
print ""
print "1) Ver estado"
print "2) Reiniciar puente"
print "3) Ver registros"
print "4) Salir"
print ""
read "choice?Elegí una opción [1-4]: "

case "$choice" in
  1) show_status ;;
  2) restart_bridge ;;
  3) show_logs ;;
  4) exit 0 ;;
  *) print "Opción inválida."; exit 2 ;;
esac

print ""
read "?Presioná Enter para cerrar..."
