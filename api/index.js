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
apiRouter.use('/models', modelsRouter)
// ROUTER: /api/cars
const carsRouter = require('./cars');
apiRouter.use('/cars', carsRouter);

// ROUTER: /api/cart
const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

module.exports = apiRouter;
