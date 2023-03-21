const client = require("./client");

async function createPhoto({carsId, image}) {
    
    const { rows: [photo] } = await client.query(`
    INSERT INTO photos ("carsId", image) 
    VALUES($1, $2) 
    RETURNING *;
    `, [carsId, image]);
  
    return photo;
  
  }

async function getAllPhotos() {

    const { rows: photo } = await client.query(`
    SELECT * FROM photos;
    `,);

    return photo;

}

async function getPhotoById(id) {

    const { rows: [photo] } = await client.query(`
    SELECT * FROM photos
    WHERE id=$1;
  `, [id]);
  
  return photo;
  
  }

async function getPhotoByCarsId({CarsId}) {

    const { rows: [photo] } = await client.query(`
    SELECT * FROM photos
    WHERE "carsId"=$1;
    `, [userId]);

return photo;

}

async function deletePhoto(id) {

  const {
    rows: [photo],
  } = await client.query(
    `
        DELETE FROM photos
        WHERE id = $1
        RETURNING *;
    `,
    [id]
  );

  return photo;
}

module.exports = {
    createPhoto,
    getAllPhotos,
    getPhotoById,
    getPhotoByCarsId,
    deletePhoto
  };