const client = require('./client');

async function createCar({
  makeId,
  typeId,
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
    INSERT INTO cars ("makeId", "typeId", year, price, mileage, description, color, "usersId") 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *;
    `,
    [makeId, typeId, year, price, mileage, description, color, userId]
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

async function updateCar({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  if (setString.length === 0) {
    return;
  }

  const {
    rows: [car],
  } = await client.query(
    `
      UPDATE cars
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
    Object.values(fields)
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
