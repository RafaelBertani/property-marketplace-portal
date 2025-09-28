# property-marketplace-portal

Property Marketplace Portal is a web platform for real estate agencies to manage and showcase properties. Built with React frontend, robust backend, PostgreSQL, and Apache Kafka for real-time events. Features interactive maps, advanced search, and admin dashboard.

# Backend

## Setup Instructions

1. **Access the PostgreSQL container**:
   Run the following command to access the PostgreSQL container:
   docker exec -it property_marketplace_portal psql -U postgres

2. **Create the database**:
    Once you're inside the PostgreSQL container, create the pmp database with:
    docker exec -it property_marketplace_portal psql -U postgres -c "CREATE DATABASE pmp;"

3. **Connect to the database**:
    \c pmp

4. **Create necessary tables**:
    CREATE TABLE users ( id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, profile_pic BYTEA, joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, role VARCHAR(10) CHECK (role IN ('ADM', 'USER')) );

    CREATE TABLE properties ( id SERIAL PRIMARY KEY, type VARCHAR(20) NOT NULL CHECK (type IN ('Apartment', 'House', 'Land', 'Commercial', 'Other')), purpose VARCHAR(20) NOT NULL CHECK (purpose IN ('Buy', 'Rent')), title VARCHAR(255) NOT NULL, description TEXT, price NUMERIC(15, 2) NOT NULL, area_sq_m NUMERIC(10, 2), city VARCHAR(50), address VARCHAR(255), latitude NUMERIC(9, 6), longitude NUMERIC(9, 6), bedrooms INT, bathrooms INT, parking_spaces INT, construction_year INT, likes INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE );

    CREATE TABLE property_images ( id SERIAL PRIMARY KEY, property_id INT NOT NULL REFERENCES properties(id) ON DELETE CASCADE, image_data BYTEA NOT NULL, image_name VARCHAR(255), is_main BOOLEAN DEFAULT FALSE, uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

    CREATE TABLE property_likes (user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE, property_id INT NOT NULL REFERENCES properties(id) ON DELETE CASCADE, PRIMARY KEY (user_id, property_id) );

5. **Create the .env file**:
    JWT_SECRET_KEY=your-secret-key-here

6. **Install dependencies**:
    Open a new terminal and run the following commands:
    cd backend/kafka-bus
    npm install

    Open a new terminal and run the following commands:
    cd backend/propertyservice
    npm install

    Open a new terminal and run the following commands:
    cd backend/userservice
    npm install

7. **Run the services with Docker**:
    Open a new terminal and run the following command:
    docker-compose up --build -d


# Frontend

## Setup Instructions

1. **Navigate to the frontend directory**:
   Open your terminal and c
   cd ./frontend

2. **Install the dependencies**:
    Once inside the frontend directory, run the following command to install all required dependencies:
    npm install

3. **Start the frontend**:
    Run the following command:
    npm run dev
