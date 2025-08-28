# property-marketplace-portal
Property Marketplace Portal is a web platform for real estate agencies to manage and showcase properties. Built with React frontend, robust backend, PostgreSQL, and Apache Kafka for real-time events. Features interactive maps, advanced search, and admin dashboard.

docker-compose up -d

docker exec -it property_marketplace_portal psql -U postgres
docker exec -it property_marketplace_portal psql -U postgres -c "CREATE DATABASE pmp;"
\c pmp
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

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Apartment', 'House', 'Land', 'Commercial', 'Other')),
    purpose VARCHAR(20) NOT NULL CHECK (purpose IN ('Buy', 'Rent')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(15, 2) NOT NULL,
    area_sq_m NUMERIC(10, 2), -- metros quadrados
    city VARCHAR(50),
    address VARCHAR(255),
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    bedrooms INT,
    bathrooms INT,
    parking_spaces INT,
    construction_year INT,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE property_images (
    id SERIAL PRIMARY KEY,
    property_id INT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_data BYTEA NOT NULL,
    image_name VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

cria um .env com: JWT_SECRET_KEY=ifthispasswordwentonlineifailed