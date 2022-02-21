#!/bin/bash
# GCEでdocker-composeコマンドが使えなかったため,それ用のdocker imageを使用
docker stop sab saf sad sag
cd ~/sampleapp1
git checkout production
git fetch origin
git reset --hard origin/production
docker-compose build
docker-compose up -d
docker restart https