#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ] ; do SOURCE="$(readlink "$SOURCE")"; done
BASE_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

PORT=9876

echo "Starting JsTestDriver Server (http://code.google.com/p/js-test-driver/)"
echo "Please open the following url and capture one or more browsers:"
echo "http://localhost:$PORT"

java -jar "$BASE_DIR/lib/jstestdriver/JsTestDriver.jar" \
     --port $PORT \
     --browserTimeout 20000 \
     --config "$BASE_DIR/jsTestDriver.conf" \
     --basePath "$BASE_DIR/.."
