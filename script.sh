#!/bin/bash
docker build -t mongoimgdi .
docker build -t frontendimgdi ./frontend
docker build -t backendimgdi ./backend

docker network create networkdi

docker run -d --name mongodbdi --network networkdi mongoimgdi
docker run -d --name frontenddi --network networkdi -p 4201:4200 -v $(pwd)/frontend:/usr/app frontendimgdi
docker run -d --name backenddi --network networkdi -p 4001:4001 -v $(pwd)/backend:/usr/app backendimgdi
