#!/usr/bin/env bash

set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROJECT_DIR="${SCRIPT_DIR}/../"

cd "$PROJECT_DIR"
npm install
npm run -ws build
npm run test
npm publish -ws --access public
