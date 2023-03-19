const express = require('express');
const apiRouter = express.Router();

const {
  createUser,
  getUserbyUsername,
  getUser,
  getUserbyId,
  getAllAdminUsers,
  getAllUsers,
} = require('../db');

const jwt = require('jsonwebtoken');
// const { requireUser } = require('./utils');
const { JWT_SECRET } = process.env;
require('dotenv').config();

// POST /api/users/register
apiRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password, isAdmin } = req.body;
    if (password.length < 8) {
      res.send({
        error: 'PasswordInvalid',
        name: 'PasswordTooShort',
        message: 'Password Too Short!',
      });
    }
    const checkUser = await getUserbyUsername(username);
    if (checkUser) {
      res.send({
        error: 'UserAlreadyExist',
        name: 'UserExistsError',
        message: `User ${username} is already taken.`,
      });
    }
    const user = await createUser({ username, password, isAdmin });
    console.log('user:', user)
    const token = jwt.sign(
      {
        id: user.id,
        username: username,
      },
      JWT_SECRET
    );

    res.send({
      message: 'User successfully registered',
      token,
      user,
    });
  } catch (error) {
    console.log('error in POST /api/users/register', error);
    next(error);
  }
});

// POST /api/users/login
apiRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      next({
        name: 'MissingCredentialError',
        message: 'Please supply both username and password',
      });
    }
    const user = await getUser({ username, password });
    if (!user) {
      console.log('User not valid');
      next({
        name: 'IncorrectCredentials',
        message: 'Please check username or password',
      });
      console.log('user still not valid');
    }
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: username,
        },
        JWT_SECRET
      );
      res.send({ message: "you're logged in!", user: user, token: token });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

apiRouter.get('/me', async (req, res, next) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    console.error('err in /me in db/users.js');
  }
});

apiRouter.get('/account', async (req, res, next) => {
  const { isAdmin } = req.body;
  console.log(isAdmin);
  try {
    const admin = await getAllAdminUsers({ isAdmin });
    console.log(admin);
    if (isAdmin === true && admin === true) {
      res.send(admin);
    }
  } catch (error) {
    console.error('err in /account in db/users.js');
  }
});

apiRouter.get('/', async (req, res, next) => {
  try {
      const users = await getAllUsers()

  res.send(
      users
  )
} catch(error) {
  next(error)
}
});

module.exports = apiRouter;
