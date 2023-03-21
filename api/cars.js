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
apiRouter.get('/', async (req, res, next) => {
    try {
        const cars = await getAllCars()

    res.send(
        cars
    )
} catch(error) {
    next(error)
}
});

// Add new car
apiRouter.post('/', async (req, res, next) => {
   try{
    const {  
        makeId,
        modelId,
        typeId,
        year,
        price,
        mileage,
        description,
        color,
        userId
    } = req.body;

    const cars = await createCar({  
        makeId,
        modelId,
        typeId,
        year,
        price,
        mileage,
        description,
        color,
        userId})

    res.send(
        cars
    )
}catch (error){
    next(error)
}
});

apiRouter.patch('/:carsId', async (req, res, next) => {
   
    try{
        const id = req.params.carsId;
     const {
         makeId,
         modelId,
         typeId,
         year,
         price,
         mileage,
         description,
         color,
         userId
     } = req.body;
 
     const updatecar = await updateCar({
         id: id,  
         makeId,
         modelId,
         typeId,
         year,
         price,
         mileage,
         description,
         color,
         userId})

     res.send(
         updatecar
     )
 }catch (error){
     next(error)
 }
 });

apiRouter.delete('/:carsId', async (req, res, next) => {
    try{
    const id = req.params.carsId;
    const removeCar = await deleteCar(id);

    res.send(removeCar);
  
    }catch (error){
        next(error)
    }
});


module.exports = apiRouter;