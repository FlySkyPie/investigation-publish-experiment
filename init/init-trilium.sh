#!/bin/sh
#
# Non-interactive initialization for a Trilium server container.
#
# Trilium exposes no environment variable that skips its web setup wizard, so
# this reproduces what the wizard does, over HTTP:
#
#   1. POST /api/setup/new-document   create the database
#   2. POST /set-password             set the initial password
#
# Both endpoints are unauthenticated on a fresh instance, which is why a plain
# HTTP client suffices. The script is idempotent: it decides what is still
# missing from the server's own state rather than from an assumption.
#
# Setting a password and disabling authentication are two different things.
# "No password" is NOT "no authentication": with authentication still enabled,
# an instance whose password is unset serves the set-password screen on
# purpose. To open Trilium without any password prompt, the server itself must
# run with TRILIUM_GENERAL_NOAUTHENTICATION=true (see docker-compose.yaml);
# only then is the password step skipped here.
#
# Environment:
#   TRILIUM_URL                 base URL of the server (default http://trilium:8080)
#   TRILIUM_PASSWORD            initial password; required unless authentication is disabled
#   TRILIUM_NO_AUTHENTICATION   true when the server runs with noAuthentication (default false)
#   TRILIUM_LOCALE              locale stored for the new database (default en)
#   TRILIUM_SKIP_DEMO_DB        true to create the database without the demo notes (default false)
#   TRILIUM_INIT_TIMEOUT        seconds to wait for the server to answer (default 300)

set -eu

base_url="${TRILIUM_URL:-http://trilium:8080}"
password="${TRILIUM_PASSWORD:-}"
no_auth="${TRILIUM_NO_AUTHENTICATION:-false}"
locale="${TRILIUM_LOCALE:-en}"
skip_demo_db="${TRILIUM_SKIP_DEMO_DB:-false}"
timeout="${TRILIUM_INIT_TIMEOUT:-300}"
deadline=$(( $(date +%s) + timeout ))

log() {
    echo "[trilium-init] $*"
}

die() {
    log "$*"
    exit 1
}

# Blocks until /api/setup/status answers, then prints its body. The endpoint is
# unauthenticated and works from before the database exists, so it doubles as
# both a readiness probe and the source of the initialized flag.
await_status() {
    while :; do
        if body=$(curl -fsS --max-time 5 "$base_url/api/setup/status" 2>/dev/null); then
            printf '%s' "$body"
            return 0
        fi
        if [ "$(date +%s)" -ge "$deadline" ]; then
            die "no answer from $base_url within ${timeout}s"
        fi
        sleep 2
    done
}

is_initialized() {
    printf '%s' "$1" | grep -Eq '"isInitialized"[[:space:]]*:[[:space:]]*true'
}

# Whether the server is still waiting for its first password. /bootstrap is an
# unauthenticated GET, and only the pre-auth password window carries
# `passwordSet: false`; once a password exists (or authentication is disabled)
# the field is absent. So this answers "is a password still owed?" regardless of
# whether the database was created in an earlier, interrupted run.
needs_password() {
    body=$(curl -fsS --max-time 5 "$base_url/bootstrap" 2>/dev/null) || return 1
    printf '%s' "$body" | grep -Eq '"passwordSet"[[:space:]]*:[[:space:]]*false'
}

log "waiting for $base_url"
status=$(await_status)

if is_initialized "$status"; then
    log "database already initialized"
else
    if [ "$skip_demo_db" = "true" ]; then
        query="?skipDemoDb"
    else
        query=""
    fi

    log "creating database (skipDemoDb=$skip_demo_db, locale=$locale)"
    if ! curl -fsS -X POST "$base_url/api/setup/new-document$query" \
            -H 'Content-Type: application/json' \
            -d "{\"locale\":\"$locale\"}" > /dev/null; then
        die "failed to create the database"
    fi

    # new-document answers once the schema is written, but confirm it before the
    # password step so a half-built database fails loudly here instead of later.
    if ! is_initialized "$(await_status)"; then
        die "the database was not reported as initialized after creation"
    fi
fi

if [ "$no_auth" = "true" ]; then
    log "authentication is disabled, no password to set"
    log "done"
    exit 0
fi

if ! needs_password; then
    log "a password is already set"
    log "done"
    exit 0
fi

if [ -z "$password" ]; then
    die "TRILIUM_PASSWORD is required. Set it, or run the server with TRILIUM_GENERAL_NOAUTHENTICATION=true (TRILIUM_NO_AUTHENTICATION=true here) to skip the password entirely."
fi

log "setting the initial password"
# /set-password redirects on success, so a 3xx counts as done.
if ! curl -fsS -o /dev/null -X POST "$base_url/set-password" \
        --data-urlencode "password1=$password" \
        --data-urlencode "password2=$password"; then
    die "failed to set the initial password"
fi

log "done"
