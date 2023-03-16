const express = require('express');
const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
require('dotenv').config();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
// ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// ROUTER: /api/type
const typeRouter = require('./type');
apiRouter.use('/type', typeRouter);

// ROUTER: /api/make
const makeRouter = require('./make');
apiRouter.use('/make', makeRouter);

// ROUTER: /api/model
const modelsRouter = require('./models');
apiRouter.use('/models', modelsRouter);
// ROUTER: /api/cars
const carsRouter = require('./cars');
apiRouter.use('/cars', carsRouter);

// ROUTER: /api/cart
const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

// ROUTER: /api/photos
const photoRouter = require('./photos');
apiRouter.use('/photos', photoRouter);

const selectedCarRouter = require('./selectedCars');
apiRouter.use('/selectedCars', selectedCarRouter);

// ROUTER: /api/favorites
const favoriteRouter = require('./favorite');
apiRouter.use('/favorite', favoriteRouter);

// ROUTER:
apiRouter.use('*', async (req, res, next) => {
  res.status(404).json({ message: '404 not found' });
});

module.exports = apiRouter;
