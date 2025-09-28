FROM node:20.16.0

WORKDIR /usr/src/app

# Copia apenas os package.json do propertyservice
COPY propertyservice/package*.json ./ 

RUN npm install

# Copia o código do propertyservice
COPY propertyservice/. .

# Copia também o kafka-bus (fica no mesmo contexto ./backend)
COPY kafka-bus ../kafka-bus

EXPOSE 3002

CMD ["node", "index.js"]
