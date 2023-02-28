const express = require('express');
const apiRouter = express.Router();

const {
  createUser,
  getUserbyUsername,
  getUser,
  getUserbyId,
  getAllAdminUsers,
} = require('../db');

const jwt = require('jsonwebtoken');
// const { requireUser } = require('./utils');
const { JWT_SECRET } = process.env;
require('dotenv').config();

// POST /api/users/register
apiRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //check password length
    if (password.length < 8) {
      res.send({
        error: 'PasswordInvalid',
        name: 'PasswordTooShort',
        message: 'Password Too Short!',
      });
    }
    // check username if it exist
    const checkUser = await getUserbyUsername(username);
    if (checkUser) {
      res.send({
        error: 'UserAlreadyExist',
        name: 'UserExistsError',
        message: `User ${username} is already taken.`,
      });
    }

    //create user after previous checks
    const user = await createUser({ username, password });
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
    const user = await getUser(username, password);

    if (!username || !password) {
      next({
        name: 'MissingCredentialError',
        message: 'Please supply both username and password',
      });
    }

    const token = jwt.sign(
      {
        // id: user.id,
        username: username,
      },
      JWT_SECRET
    );

    res.send({ message: "you're logged in!", user, token });
  } catch (error) {
    console.error('err in login in api/users.js', error);
  }
});

module.exports = apiRouter;
