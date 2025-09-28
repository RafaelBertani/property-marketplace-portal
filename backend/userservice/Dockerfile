FROM node:20.16.0

WORKDIR /usr/src/app

COPY userservice/package*.json ./ 

RUN npm install

COPY userservice/. .

# Copia também o kafka-bus
COPY kafka-bus ../kafka-bus

EXPOSE 3001

CMD ["node", "index.js"]
