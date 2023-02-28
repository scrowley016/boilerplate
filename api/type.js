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


module.exports = apiRouter;