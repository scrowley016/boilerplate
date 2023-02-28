const client = require('./client');

async function createMakes({ name }) {
  try {
    const {
      rows: [make],
    } = await client.query(
      `
        INSERT INTO make (name)
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
        RETURNING *
      `,
      [name]
    );
    return make;
    //took inspiration from routines from fitnesstracker
  } catch (error) {
    console.error('error in createMakes in makes.js', error);
  }
}

//select and return an array of all activities
async function getAllMakes() {
  try {
    const { rows: makes } = await client.query(`
    SELECT * 
    FROM make
    `);
    return makes;
  } catch (error) {
    console.error('error in getAllMakes in db/makes.js', error);
  }
}

async function getMakeById(id) {
  try {
    const {
      rows: [makes],
    } = await client.query(
      `
    SELECT * 
    FROM make
    WHERE id=$1
    `,
      [id]
    );
    return makes;
  } catch (error) {
    console.error('err in getMakeById in db/make.js', error);
  }
}

async function getMakeByName(name) {
  try {
    const {
      rows: [makes],
    } = await client.query(
      `
    SELECT *
    FROM make
    WHERE name=$1
    `,
      [name]
    );
    return makes;
  } catch (error) {
    console.error('error in getMakeByName in db/make.js', error);
  }
}

module.exports = {
  createMakes,
  getMakeByName,
  getAllMakes
};
