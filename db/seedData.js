const {
  client,
  // declare your model imports here
  // for example, User
} = require('.');
const { createUser } = require('./');

async function dropTables() {
  try {
    console.log('Dropping all tables...');
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

    console.log('finished dropping tables!');
  } catch (error) {
    console.error('Error dropping tables...');
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Starting to create tables...');
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
      color VARCHAR(255),
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
      image TEXT
    );
    `); //use the string of the text to the url link to image
    //could download image to then add to source file on here
    //NOTE: ASK SHANNON... on learn dot, bullet 6, do we need email?
    console.log('finished creating tables!');
  } catch (error) {
    console.error('Error in creating tables...');
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log('Starting to create users...');
    const usersToCreate = [
      { username: 'bobby', password: 'bobby123', isAdmin: true },
      { username: 'ana', password: 'ana123456', isAdmin: false },
      { username: 'zack', password: 'zack123456', isAdmin: true },
    ];
    const users = await Promise.all(usersToCreate.map(createUser)); //don't forget to write this function "createUser"

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users...');
    throw error;
  }
}

async function createInitialMakes() {
  try {
    console.log('Starting to create makes');
    const makesToCreate = [
      { name: 'Audi' },
      { name: 'Ford' },
      { name: 'Mercedes-Benz' },
      { name: 'Tesla' },
      { name: 'Rivian' },
      { name: 'LucidAir' },
      { name: 'BMW' },
    ];

    const makes = await Promise.all(makesToCreate.map(createMakes)); //don't forget to write this function "createMakes"

    console.log('Makes created:');
    console.log(makes);
    console.log('Finished creating makes!');
  } catch (error) {}
}

async function createInitialModels() {
  try {
    console.log("Starting to create models...");
    const models = [
      {make: Audi.id, name: "Q4 e-tron" },
      {make: Audi.id, name: "Q4 Sportback e-tron" },
      {make: Audi.id, name: "Q8 e-tron" },
      {make: Audi.id, name: "Q8 Sportback e-tron" },
      {make: Audi.id, name: "e-tron GT quattro" },
      {make: Ford.id, name: "Mustang Mach-E" },
      {make: Ford.id, name: "Ford F-150 Lightning" },
      {make: Mercedes-Benz.id, name: "EQA" },
      {make: Mercedes-Benz.id, name: "EQB" },
      {make: Mercedes-Benz.id, name: "EQS" },
      {make: Mercedes-Benz.id, name: "EQE" },
      {make: Mercedes-Benz.id, name: "EQC" },
      {make: Tesla.id, name: "Model S" },
      {make: Tesla.id, name: "Model 3" },
      {make: Tesla.id, name: "Model X" },
      {make: Tesla.id, name: "Model Y" },
      {make: Rivian.id, name: "R1T" },
      {make: Rivian.id, name: "R1S" },
      {make: LucidAir.id, name: "Touring" },
      {make: BMW.id, name: "i4" },
      {make: BMW.id, name: "iX" },
      {make: BMW.id, name: "i7" }
    ]
    console.log("Finished creating models!");
  } catch (error) {
    console.log("Error creating models!");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
