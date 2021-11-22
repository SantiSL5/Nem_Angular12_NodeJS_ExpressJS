FROM node:latest as frontend
EXPOSE 4200
WORKDIR /usr/app
COPY ./frontend .
COPY ./.env .
RUN npm install -g @angular/cli --save | npm install
CMD npm start

FROM node:latest as backend
EXPOSE 4000
WORKDIR /usr/app
COPY ./backend .
COPY ./.env .
RUN npm install
CMD npm start

FROM mongo:latest as mongo
EXPOSE 27017