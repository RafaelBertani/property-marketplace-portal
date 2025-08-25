# property-marketplace-portal
Property Marketplace Portal is a web platform for real estate agencies to manage and showcase properties. Built with React frontend, robust backend, PostgreSQL, and Apache Kafka for real-time events. Features interactive maps, advanced search, and admin dashboard.

docker-compose up -d

docker exec -it property_marketplace_portal psql -U postgres
docker exec -it property_marketplace_portal psql -U postgres -c "CREATE DATABASE pmp;"
\c pmp
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto_perfil BYTEA,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    funcao VARCHAR(10) CHECK (funcao IN ('ADM', 'USER'))
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic BYTEA,
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(10) CHECK (role IN ('ADM', 'USER'))
);

npm install bcrypt
npm install jsonwebtoken
npm install dotenv
cria arquivo .env
JWT_SECRET_KEY=your-secret-key-here

//npm install '@vis.gl/react-google-maps'
npm install leaflet react-leaflet