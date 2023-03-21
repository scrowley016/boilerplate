const express = require('express');
const apiRouter = express.Router();

const {
  createMakes,
  getMakeById,
  getMakeByName,
  getAllMakes,
} = require('../db/make');

// GET /api/makes/name
apiRouter.get('/', async (req, res, next) => {
  try {
    const makes = await getAllMakes();
    res.send(makes);
  } catch (error) {
    console.error('err in getting all makes', error);
  }
});

module.exports = apiRouter;
