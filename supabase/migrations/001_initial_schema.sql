CREATE TABLE localities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    skin_image_url TEXT NOT NULL,
    latitude_center DECIMAL(10, 8) DEFAULT -36.3533,
    longitude_center DECIMAL(11, 8) DEFAULT -56.6783,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon_url TEXT NOT NULL
);

CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    locality_id INT REFERENCES localities(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    is_free BOOLEAN DEFAULT TRUE,
    opening_hours VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    place_id INT REFERENCES places(id) ON DELETE CASCADE,
    discount_text VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP
);