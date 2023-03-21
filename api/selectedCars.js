const express = require('express');
const apiRouter = express.Router();

const {
    getSelectedCars,
    addSelectedCars,
    deleteSelectedCar
} = require('../db/selectedCars');

apiRouter.delete('/:carId', async (req, res, next) => {
  try{
  const id = req.params.carId;
  const removeCarFromCart = await deleteSelectedCar(id);
  res.send(removeCarFromCart);

  }catch (error){
      next(error)
  }
});
  

apiRouter.post('/', async (req, res, next) => {
    const { carsId, cartId } = req.body;

    try {
   
      const selectedCars = await addSelectedCars(carsId, cartId);

      res.send (selectedCars);
    } catch (error) {
      console.error('error in :id api/selectedCars', error);
    }
  });
  
  apiRouter.get('/', async (req, res, next) => {
    try {
      const selectedCars = await getSelectedCars();
      res.send (selectedCars);
    } catch (error) {
      console.error('error in GET getSelectedCars api/selectedCars', error);
    }
  });

module.exports = apiRouter;