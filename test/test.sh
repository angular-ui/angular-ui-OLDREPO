#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ] ; do SOURCE="$(readlink "$SOURCE")"; done
BASE_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

java -jar "$BASE_DIR/lib/jstestdriver/JsTestDriver.jar" \
     --config "$BASE_DIR/jsTestDriver.conf" \
     --basePath "$BASE_DIR/.." \
     --tests all
