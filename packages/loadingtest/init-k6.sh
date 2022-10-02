#!/bin/bash

curl https://github.com/grafana/k6/releases/download/v0.40.0/k6-v0.40.0-linux-amd64.tar.gz -L | tar xvz --strip-components 1

#K6_CLOUD_TOKEN=<TOKEN> ./k6 run --out cloud ./dist/index.js
./k6 run ./dist/index.js

rm -rf ./k6
