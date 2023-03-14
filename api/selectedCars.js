const express = require('express');
const apiRouter = express.Router();

const {
    addSelectedCars,
    getSelectedCarsById,
    getSelectedCarsByUserId,
} = require('../db');

apiRouter.patch('/', async (req, res, next) => {
    const { carsIds, cartId } = req.body;
    try {
      const selectedCars = [];
      for (const carsId of carsIds) {
        const selectedCar = await addSelectedCars({ carsId, cartId });
        selectedCars.push(selectedCar);
      }
      return res.send(selectedCars);
    } catch (error) {
      console.error('error in api/selectedCars', error);
    }
  });
  

apiRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const selectedCars = await getSelectedCarsById(id);
      return (selectedCars);
    } catch (error) {
      console.error('error in :id api/selectedCars', error);
    }
  });
  
  apiRouter.get('/users/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
      const selectedCars = await getSelectedCarsByUserId({ id: userId });
      return (selectedCars);
    } catch (error) {
      console.error('error in users/:userId api/selectedCars', error);
    }
  });