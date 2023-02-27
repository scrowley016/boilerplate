const apiRouter = require('express').Router();

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

// ROUTER: /api/model

// ROUTER: /api/cars
const carsRouter = require('./cars');
apiRouter.use('/cars', carsRouter);

// ROUTER: /api/cart

module.exports = apiRouter;
