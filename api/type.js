const express = require('express');
const apiRouter = express.Router();

const {
  createType,
  getAllTypes,
  getTypeById,
  getTypeByName
} = require('../db/type');


// Get all types
apiRouter.get('/', async (req, res) => {
  const types = await getAllTypes()
  res.send(
    types
  )
});

// Post a new type
apiRouter.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const typeExists = await getTypeByName(name)

    if (typeExists) {
      throw ({
        error: "error",
        message: `An type with name ${name} already exists`,
        name: `error`
      });
    } else {

      const type = await createType({ name })

      res.send(
        type
      );
    }
  } catch (error) {
    next(error)
  }
})

// apiRouter.delete('/:typeId', async (req, res, next) => {

//   const id = req.params.typeId;

//   const routine = await getRoutineById(req.params.routineId);

//   if (routine.creatorId === req.user.id) {

//     const removedRoutine = await destroyRoutine(id);
  
//     res.send(removedRoutine);

//   }
//   else {

//     res.status(403)

//     res.send({
//       error: `AuthorizationError`,
//       message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
//       name: `Only the author of the routine can delete it.`
//     })
//   }

// })

module.exports = apiRouter;