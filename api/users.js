const express = require('express');
const apiRouter = express.Router();

const {
  createUser,
  getUserbyUsername,
  getUser,
  getUserbyId,
  getAllAdminUsers,
} = require('../db');

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
    // const user = await createUser({ username, password });

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

module.exports = apiRouter;
