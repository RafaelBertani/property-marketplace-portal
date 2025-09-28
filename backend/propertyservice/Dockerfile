FROM node:20.16.0

WORKDIR /usr/src/app

COPY propertyservice/package*.json ./ 

RUN npm install

COPY propertyservice/. .

# Copia também o kafka-bus (fica no mesmo contexto ./backend)
COPY kafka-bus ../kafka-bus

EXPOSE 3002

CMD ["node", "index.js"]
