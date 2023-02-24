const {
  client,
  // declare your model imports here
  // for example, User
} = require('.');

async function dropTables() {
  try {
    console.log('Dropping all tables');
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS cars;
    DROP TABLE IF EXISTS make;
    DROP TABLE IF EXISTS model; 
    DROP TABLE IF EXISTS selectedCars;
    DROP TABLE IF EXISTS type;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS photos;
    DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    await client.query(`
    CREATE TABLE cars (
      id SERIAL PRIMARY KEY, 
      description TEXT,
      isFavorite BOOLEAN DEFAULT false, 
      price INTEGER,
      year INTEGER,
      "typeId" INTEGER REFERENCES type(id),
      "makeId" INTEGER REFERENCES make(id),
      "usersId" INTEGER REFERENCES users(id),
      color TEXT,
      mileage INTEGER,
      UNIQUE ("typeId", "makeId", "userId") 
    );

    CREATE TABLE users (
      id SERIAL PRIMARY KEY, 
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
    );

    CREATE TABLE make (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE model (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL,
      "makeId" INTEGER REFERENCES make(id)
    );

    CREATE TABLE type (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE selectedCars (
      id SERIAL PRIMARY KEY, 
      "carsId" INTEGER REFERENCES cars(id)
    );

    CREATE TABLE cart (
      id SERIAL PRIMARY KEY, 
      "selectedCars" INTEGER REFERENCES selectedCars(id),
      "usersId" INTEGER REFERECNES users(id)
    );

    CREATE TABLE photos (
      id SERIAL PRIMARY KEY, 
      "carsId" INTEGER REFERENCES cars(id),
      image VARBINARY(MAX)
    );
    `); //NOTE SHANNON WHAT IS 255>???
  } catch (error) {
    console.error('Error in creating tables...');
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
