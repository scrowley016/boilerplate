const { client } = require('./');
const { createUser, getAllAdminUsers } = require('./users');
const { createMakes, getAllMakes } = require('./make');
const { createModels } = require('./models');
const { createType, getAllTypes } = require('./type');
const { createCar } = require('./cars');
const { createCart } = require('./cart');
const { addSelectedCars } = require('./selectedCars');

async function dropTables() {
  try {
    console.log('Dropping all tables...');
    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS selectedCars;
      DROP TABLE IF EXISTS favorite;
      DROP TABLE IF EXISTS photos;
      DROP TABLE IF EXISTS cars;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS model; 
      DROP TABLE IF EXISTS make;
      DROP TABLE IF EXISTS type;
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
    
    CREATE TABLE users (
      id SERIAL PRIMARY KEY, 
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    );
    
    CREATE TABLE make (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) UNIQUE NOT NULL
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
    
    CREATE TABLE cars (
      id SERIAL PRIMARY KEY, 
      description TEXT,
      price INTEGER,
      year INTEGER,
      "typeId" INTEGER REFERENCES type(id),
      "makeId" INTEGER REFERENCES make(id),
      "usersId" INTEGER REFERENCES users(id),
      "modelId" INTEGER REFERENCES model(id),
      color VARCHAR(255),
      mileage INTEGER,
      UNIQUE ("typeId", "makeId", "usersId")
    );
      
    CREATE TABLE photos (
      id SERIAL PRIMARY KEY, 
      "carsId" INTEGER REFERENCES cars(id),
      image TEXT
    );

    CREATE TABLE favorite (
      id SERIAL PRIMARY KEY,
      "usersId" INTEGER REFERENCES users(id), 
      "carsId" INTEGER REFERENCES cars(id)
    );

    CREATE TABLE cart (
      id SERIAL PRIMARY KEY, 
      "usersId" INTEGER REFERENCES users(id)
    );

    CREATE TABLE selectedCars (
      id SERIAL PRIMARY KEY, 
      "carsId" INTEGER REFERENCES cars(id),
      "cartId" INTEGER REFERENCES cart(id)
    );

    `);
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
      { username: 'ana1', password: 'ana123456', isAdmin: false },
      { username: 'admin', password: '12345678', isAdmin: true },
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
    console.log('Starting to create models...');
    const [Audi, Ford, Mercedes, Tesla, Rivian, LucidAir, BMW] =
      await getAllMakes();

    const modelsToCreate = [
      { makeId: Audi.id, name: 'Q4 e-tron' },
      { makeId: Audi.id, name: 'Q4 Sportback e-tron' },
      { makeId: Audi.id, name: 'Q8 e-tron' },
      { makeId: Audi.id, name: 'Q8 Sportback e-tron' },
      { makeId: Audi.id, name: 'e-tron GT quattro' },
      { makeId: Ford.id, name: 'Mustang Mach-E' },
      { makeId: Ford.id, name: 'Ford F-150 Lightning' },
      { makeId: Mercedes.id, name: 'EQA' },
      { makeId: Mercedes.id, name: 'EQB' },
      { makeId: Mercedes.id, name: 'EQS' },
      { makeId: Mercedes.id, name: 'EQE' },
      { makeId: Mercedes.id, name: 'EQC' },
      { makeId: Tesla.id, name: 'Model S' },
      { makeId: Tesla.id, name: 'Model 3' },
      { makeId: Tesla.id, name: 'Model X' },
      { makeId: Tesla.id, name: 'Model Y' },
      { makeId: Rivian.id, name: 'R1T' },
      { makeId: Rivian.id, name: 'R1S' },
      { makeId: LucidAir.id, name: 'Touring' },
      { makeId: BMW.id, name: 'i4' },
      { makeId: BMW.id, name: 'iX' },
      { makeId: BMW.id, name: 'i7' },
    ];
    const models = await Promise.all(modelsToCreate.map(createModels));
    console.log('Models created:');
    console.log(models);
    console.log('Finished creating models!');
  } catch (error) {
    console.log('Error creating models!');
    throw error;
  }
}

async function createInitialTypes() {
  try {
    console.log('Starting to create types...');
    const typesToCreate = [
      { name: 'Sedan' },
      { name: 'SUV' },
      { name: 'Truck' },
    ];

    const types = await Promise.all(typesToCreate.map(createType));

    console.log('Types created:');
    console.log(types);
    console.log('Finished creating types!');
  } catch (error) {
    console.error('Error creating Types...');
    throw error;
  }
}

async function createInitialCars() {
  try {
    console.log('Starting to create cars...');

    const [Audi, Ford, Mercedes, Tesla, Rivian, LucidAir, BMW] =
      await getAllMakes();
    const [Sedan, SUV, Truck] = await getAllTypes();
    const [bobby, zack] = await getAllAdminUsers(true);

    const carsToCreate = [
      {
        makeId: Audi.id,
        typeId: Sedan.id,
        modelId: 3,
        year: '2022',
        price: '100000',
        mileage: '500',
        description: 'Great car! Really fast.',
        color: 'blue',
        userId: bobby.id,
      },
      {
        makeId: BMW.id,
        typeId: Sedan.id,
        modelId: 6,
        year: '2023',
        price: '80000',
        mileage: '15000',
        description: 'Super fun. Love it!',
        color: 'black',
        userId: zack.id,
      },
      {
        makeId: Mercedes.id,
        typeId: SUV.id,
        modelId: 6,
        year: '2021',
        price: '120000',
        mileage: '30000',
        description: 'Zoom, zoom',
        color: 'red',
        userId: zack.id,
      },
    ];

    const cars = await Promise.all(carsToCreate.map(createCar));

    console.log('Cars created:');
    console.log(cars);
    console.log('Finished creating cars!');
  } catch (error) {
    console.error('Error creating cars...');
    throw error;
  }
}

// async function createInitialCarts() {
//   try {
//     console.log('Starting to create carts...');

//     const cartsToCreate = [{ userId: 1 }];

//     const carts = await Promise.all(cartsToCreate.map(createCart));

//     console.log('Carts created:');
//     console.log(carts);
//     console.log('Finished creating carts!');
//   } catch (error) {
//     console.error('Error creating carts...');
//     throw error;
//   }
// }

// async function createInitialCarSelect() {
//   try {
//     console.log('Starting to create selectedCars...');

//     const createCarSelect = [{ carsId: 1, cartId: 1 }];

//     const carSelect = await Promise.all(createCarSelect.map(addSelectedCars));

//     console.log('Selected cars created:');
//     console.log(carSelect);
//     console.log('Finished creating carSelect!');
//   } catch (error) {
//     console.error('Error creating carSelect...');
//     throw error;
//   }
// }

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialMakes();
    await createInitialTypes();
    await createInitialModels();
    await createInitialCars();
    // await createInitialCarts();
    // await createInitialCarSelect();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
