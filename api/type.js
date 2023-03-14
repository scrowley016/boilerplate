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


module.exports = apiRouter;