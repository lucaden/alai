#!/bin/bash 
set -e
sleep 0.1m

npm i
npm run build
PORT=4000 npm start
#apachectl -D FOREGROUND
