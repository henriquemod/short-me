#!/usr/bin/env sh

case $1 in
    start)
        if [[ -f build/main/server.js ]]; then
            exec node build/main/server.js
        else
            exec node build/src/main/server.js
        fi
    ;;
    *)
        if [[ -n "$*" ]]; then
            exec "$*"
        else
            exec ./"$this_script" start
        fi
    ;;
esac
