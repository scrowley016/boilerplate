const client = require("./client");

async function addSelectedCars({ carsId, cartId }) {
    try {
        const {
            rows: [selectedCars],
        } = await client.query(
            `INSERT INTO selectedCars ("carsId", "cartId")
            VALUES ($1, $2)
            RETURNING *
            `,
            [carsId, cartId]
        );
        return selectedCars;
    } catch (error) {
        console.error('Error in addSelectedCars in db/selectedCars.js:', error.message);
        throw error;
    }
}

async function getSelectedCarsById(id) {
    try {
        const {
            rows: [selectedCars],
        } = await client.query(
            `SELECT *
            FROM selectedCars
            WHERE id = $1
            `,
            [id]
        );
        return selectedCars;
    } catch (error) {
        console.log('error in getSelectedCarsById in db/selectedCars.js');
    }
}

async function getSelectedCarsByUserId( { id }) {
    try {
        const { rows: selectedCars } = await client.query(
            ` SELECT *
            FROM selectedCars
            WHERE "usersId" = $1
            `,
            [id]
        );
        return selectedCars;
    }   catch (error) {
        console.error('error in getSelectedCarsByUserId in db/selectedCars.js')
    }
}

module.exports = {
    addSelectedCars,
    getSelectedCarsById,
    getSelectedCarsByUserId
}