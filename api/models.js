const express = require('express');
const apiRouter = express.Router();
const { createModels, getAllModels, getModelsById } = require('../db/models');

// get all models
apiRouter.get('/', async (req, res, next) => {
  try {
    const models = await getAllModels();
    res.send(models);
  } catch (error) {
    console.error('error in get all models endpoint', error);
    next(error);
  }
});

// create models
apiRouter.post('/', async (req, res, next) => {
  try {
    const { name, makeId } = req.body;
    const newModels = await createModels({ name, makeId });
    res.send(newModels);
  } catch (error) {
    console.error('error in create models endpoint', error);
    next(error);
  }
});

// get models by ID
apiRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const models = await getModelsById(id);
    res.send(models);
  } catch (error) {
    console.error('error in get models by id endpoint', error);
    next(error);
  }
});

module.exports = apiRouter;
