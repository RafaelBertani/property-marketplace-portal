FROM node:20.16.0

WORKDIR /usr/src/app

# Copia apenas os package.json do userservice
COPY userservice/package*.json ./ 

RUN npm install

# Copia o código do userservice
COPY userservice/. .

# Copia também o kafka-bus
COPY kafka-bus ../kafka-bus

EXPOSE 3001

CMD ["node", "index.js"]
