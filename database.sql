
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Create a new database called `prime_app`
-- If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "firstName" VARCHAR (50)
);

CREATE TABLE "collections" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (150) NOT NULL,
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "restaurants" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (150) NOT NULL,
    "collection_id" INT REFERENCES "collections",
    "user_id" INT REFERENCES "user",
    "google_places_id" VARCHAR (150)
);

CREATE TABLE "notes" (
    "id" SERIAL PRIMARY KEY,
    "notes_field" VARCHAR (500) NOT NULL,
    "user_id" INT REFERENCES "user",
    "restaurant_id" INT REFERENCES "restaurants" ON DELETE CASCADE,
    "date_time_created" TIMESTAMP NOT NULL 
    			DEFAULT CURRENT_TIMESTAMP,
    "date_time_modified" TIMESTAMP NOT NULL
    			DEFAULT CURRENT_TIMESTAMP        
);