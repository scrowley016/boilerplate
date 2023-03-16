const express = require('express');
const apiRouter = express.Router();

const {
    getSelectedCars,
    addSelectedCars,
} = require('../db/selectedCars');

apiRouter.patch('/', async (req, res, next) => {
    try {
      const { carsId, cartId } = req.body;
      const selectedCars = await getSelectedCars(carsId, cartId)
      res.send(selectedCars);
    } catch (error) {
      console.error('error in api/selectedCars', error);
      next ()
    }
  });
  

apiRouter.post('/', async (req, res, next) => {
    const { carsId, cartId } = req.body;
    console.log(carsId, cartId, "api backend")
    try {
      console.log("test")
      const selectedCars = await addSelectedCars(carsId, cartId);
      console.log(selectedCars)
      res.send (selectedCars);
    } catch (error) {
      console.error('error in :id api/selectedCars', error);
    }
  });
  
  apiRouter.get('/', async (req, res, next) => {
    console.log ("backend api getselected")
    try {
      const selectedCars = await getSelectedCars();
      res.send (selectedCars);
    } catch (error) {
      console.error('error in GET getSelectedCars api/selectedCars', error);
    }
  });

module.exports = apiRouter;