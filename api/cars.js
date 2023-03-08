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

// apiRouter.patch('/:carsId', async (req, res, next) => {
//     try{
//     const { carsId } = req.params;
//     const { name, description } = req.body
//     // console.log("activityId:", activityId)
//     // console.log("name:", name)
//     // console.log("dexcription:", description)

//     const activityById = await getActivityById(activityId)
//     // console.log("activity from Id:", activityById)
//     // console.log("activityById.name:", activityById?.name)

//     const activityByName = await getActivityByName(name)
//     // console.log("activity from Name:", activityByName)

//     if (!activityById) {
//         // console.log(`ERROR!! Activity ${activityId} not found`)
//             throw ({
//             error: "error",
//             message: `Activity ${activityId} not found`,
//             name: `error`
//         });
//     } if (activityByName) {
//         // console.log(`ERROR!! If ${name} === ${activityByName.name} you will see this!`)
//         throw ({
//             error: "error",
//             message: `An activity with name ${name} already exists`,
//             name: `error`
//         });
//     }

//     const updatedActivity = await updateActivity({ id: activityId, name, description })
//     // console.log("updatedActivity:", updatedActivity)

//     res.send(
//         updatedActivity
//     );

//     // console.log('This is the end of the function!')

//     } catch(error) {
//         next(error)
//     }


// })

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