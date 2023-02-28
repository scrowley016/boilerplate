const client = require('./client');

async function addCarToFavorite({ usersId, carsId }) {
  try {
    const {
      rows: [favorites],
    } = await client.query(
      `
        INSERT INTO favorite ("usersId", "carsId")
        VALUES ($1, $2)
        RETURNING *
        `,
      [usersId, carsId]
    );
    return favorites;
  } catch (error) {
    console.error('err in createFavorite in db/favorite.js');
  }
}

async function getFavoriteById(id) {
  try {
    const {
      rows: [favorites],
    } = await client.query(
      `
        SELECT * 
        FROM favorite
        WHERE id = $1
        `,
      [id]
    );

    return favorites;
  } catch (error) {
    console.error('err in getFavoriteById in db/favorite.js');
  }
}

async function getFavoriteByUserId({ id }) {
  try {
    const { rows: favorite } = await client.query(
      `
           SELECT * 
           FROM favorite
           WHERE "usersId" = $1
            `,
      [id]
    );
    return favorite;
  } catch (error) {
    console.error('err in getFavoriteByUserId', error);
  }
}

async function updateFavorite({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}=$${index + 1}`)
      .join(', ');
    const { rows: favorite } = await client.query(
      `
            UPDATE favorite
            SET ${setString}
            WHERE id = ${id}
            RETURNING *
            `,
      Object.values(fields)
    );

    return favorite;
  } catch (error) {
    console.error('err in updateFavorite', error);
  }
}

async function destroyFavorite(id) {
  try {
    const {
      rows: [favorite],
    } = await client.query(
      `
            DELETE 
            FROM favorite
            WHERE id = $1
            RETURNING *
            `,
      [id]
    );

    return favorite;
  } catch (error) {
    console.error('err in destroyFavorite', error);
  }
}

module.exports = {
  addCarToFavorite,
  getFavoriteById,
  getFavoriteByUserId,
  updateFavorite,
  destroyFavorite,
};
