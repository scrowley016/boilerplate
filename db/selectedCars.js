const client = require("./client");

async function addSelectedCars( carsId, cartId ) {
    console.log(carsId, cartId, "backend db")
    try {
        const { rows: [selectedCars] } = await client.query(`
        INSERT INTO selectedcars ("carsId", "cartId")
            VALUES ($1, $2)
            RETURNING *;
            `, [carsId, cartId]
        );
        return selectedCars;
    } catch (error) {
        console.error('Error in addSelectedCars in db/selectedCars.js:', error.message);
        throw error;
    }
}

async function deleteSelectedCar(id) {
    const {
      rows: [car],
    } = await client.query(
      `
          DELETE FROM selectedcars
          WHERE "carsId" = $1
          RETURNING *;
      `,
      [id]
    );
  
    return car;
  }

async function getSelectedCars() {
    console.log ("db selectedCars")
    try {
        const { rows: selectedCars } = await client.query(` 
            SELECT *
            FROM selectedcars;
            `,
        );
        console.log(selectedCars)
        return selectedCars;
    }   catch (error) {
        console.error('error in getSelectedCars in db/selectedCars.js')
    }
}

module.exports = {
    addSelectedCars,
    deleteSelectedCar,
    getSelectedCars
}