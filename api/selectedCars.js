const express = require('express');
const apiRouter = express.Router();

const {
    getSelectedCars,
    addSelectedCars,
    getSelectedCarsByUserId,
} = require('../db');

apiRouter.patch('/', async (req, res, next) => {
    try {
      const { carsId, cartId } = req.body;
      const selectedCars = await getSelectedCars({carsId, cartId})
      return res.send(selectedCars);
    } catch (error) {
      console.error('error in api/selectedCars', error);
    }
  });
  

apiRouter.post('/', async (req, res, next) => {
    const { carId, userId } = req.body;
    try {
      console.log("test")
      const selectedCars = await addSelectedCars(carId, userId);
      console.log(selectedCars)
      return (selectedCars);
    } catch (error) {
      console.error('error in :id api/selectedCars', error);
    }
  });
  
  apiRouter.get('/users/:usersId', async (req, res, next) => {
    const { usersId } = req.params;
    try {
      const selectedCars = await getSelectedCarsByUserId({ id: usersId });
      return (selectedCars);
    } catch (error) {
      console.error('error in users/:userId api/selectedCars', error);
    }
  });

module.exports = apiRouter;