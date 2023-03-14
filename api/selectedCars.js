const express = require('express');
const apiRouter = express.Router();

const {
    getSelectedCars,
    getSelectedCarsById,
    getSelectedCarsByUserId,
} = require('../db');

apiRouter.post('/', async (req, res, next) => {
    try {
      const { carsId, cartId } = req.body;
      const selectedCars = await getSelectedCars({carsId, cartId})
      return res.send(selectedCars);
    } catch (error) {
      console.error('error in api/selectedCars', error);
    }
  });
  

apiRouter.post('/:carId', async (req, res, next) => {
    const { carsid, cartId } = req.params;
    try {
      console.log("test")
      const selectedCars = await getSelectedCarsById(carsid, cartId);
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