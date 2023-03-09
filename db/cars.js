const client = require('./client');

async function createCar({
  makeId,
  typeId,
  modelId,
  year,
  price,
  mileage,
  description,
  color,
  userId,
}) {
  const {
    rows: [car],
  } = await client.query(
    `
    INSERT INTO cars ("makeId", "typeId", "modelId", year, price, mileage, description, color, "usersId") 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *;
    `,
    [makeId, typeId, modelId, year, price, mileage, description, color, userId]
  );

  return car;
}

async function getAllCars() {
  const { rows: cars } = await client.query(`
    SELECT * FROM cars;
    `);

  return cars;
}

async function getCarById(id) {
  const {
    rows: [car],
  } = await client.query(
    `
    SELECT * FROM cars
    WHERE id=$1;
  `,
    [id]
  );

  return car;
}

async function getCarByName(name) {
  const {
    rows: [car],
  } = await client.query(
    `
    SELECT * FROM cars
    WHERE name=$1;
    `,
    [name]
  );

  return car;
}

async function updateCar({ 
  id,
  makeId,
  modelId,
  typeId,
  year,
  price,
  mileage,
  description,
  color,
  usersId }) {

  const {
    rows: [car],
  } = await client.query(
    `
      UPDATE cars
      SET "makeId"=$1,"modelId"=$2, "typeId"=$3, year=$4, price=$5, mileage=$6, description=$7, color=$8, "usersId"=$9
      WHERE id=${id}
      RETURNING *;
    `,
    [ 
      makeId,
      modelId,
      typeId,
      year,
      price,
      mileage,
      description,
      color,
      usersId]
  );

  return car;
}

async function deleteCar(id) {
  const {
    rows: [car],
  } = await client.query(
    `
        DELETE FROM cars
        WHERE id = $1
        RETURNING *;
    `,
    [id]
  );

  return car;
}

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  getCarByName,
  updateCar,
  deleteCar,
};
