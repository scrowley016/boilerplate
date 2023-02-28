const express = require('express');
const apiRouter = express.Router();

const {
    createCar,
    getAllCars,
    getCarById,
    getCarByName,
    updateCar,
    deleteCar
} = require('../db/cars');


// Get all cars
apiRouter.get('/', async (req, res) => {
    const cars = await getAllCars()

    res.send(
        cars
    )
});




module.exports = apiRouter;