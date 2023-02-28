const client = require('./client');
// const bcrypt = require('bcrypt');

async function createUser({ username, password, isAdmin }) {
  // const SALT_COUNT = 10;

  // const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password, isAdmin)
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *
        `,
      [username, password, isAdmin]
    );

    delete user.password;

    return user;
  } catch (error) {
    console.error('error creating users in users.js', error);
  }
}

async function getUserbyUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * 
      FROM users
      WHERE username = $1
      `,
      [username]
    );
    return user;
  } catch (error) {
    console.error('error in getUserbyUsername');
  }
}

async function getUser({ username, password, isAdmin }) {
  try {
    const user = await getUserbyUsername(username);
    // const password = user.password;

    return user;
  } catch (error) {
    console.error('err  in getUser in db/users.js', error);
  }
} //how to test if this function works?

async function getUserbyId(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id = $1
      `,
      [userid]
    );

    delete user.password;

    return user;
  } catch (error) {
    console.error('err in getUserById in db/users.js', err);
  }
}

async function getAllAdminUsers({ isAdmin }) {
  try {
    const { rows: users } = await client.query(
      `
      SELECT *
      FROM users
      WHERE isAdmin = true
      `
    );
    return users;
  } catch (error) {
    console.error('err in getAllAdminUsers in db/users.js', error);
  }
}

module.exports = {
  createUser,
  getUserbyUsername,
  getUser,
  getUserbyId,
  getAllAdminUsers,
};
