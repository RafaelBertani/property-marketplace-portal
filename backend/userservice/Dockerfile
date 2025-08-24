# Usa uma imagem oficial do Node.js
FROM node:20.16.0

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta que o app usa
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
