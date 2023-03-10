const client = require('./client');
const bcrypt = require('bcrypt');

async function createUser({ username, password, isAdmin }) {
  const SALT_COUNT = 10;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  console.log({ hashedPassword });
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password, "isAdmin")
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *
        `,
      [username, hashedPassword, isAdmin]
    );
    console.log(user);
    delete user.password;
    console.log('line 23', { user });
    return user;
  } catch (error) {
    console.error('error creating users in users.js', error);
  }
}

async function getUserbyUsername(username) {
  console.log('getuserbyusername line 31', { username });
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
    console.log('Line 42 from userbyusername', { user });
    return user;
  } catch (error) {
    console.error('error in getUserbyUsername');
  }
}

async function getUser({ username, password }) {
  const user = await getUserbyUsername(username);
  const hashedPassword = user.password;
  console.log({ hashedPassword, password });
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log('line 51', { password });
  console.log({ isValid });

  try {
    if (isValid) {
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
      console.log('line 65', { user });
      return user;
    }
  } catch (error) {
    console.error('err  in getUser in db/users.js', error);
  }
}

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
      [userId]
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
      WHERE "isAdmin" = true
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
