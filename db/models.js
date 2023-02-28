const client = require('./client');

async function createModels({ name, makeId }) {
    try {
      const {
        rows: [models],
      } = await client.query(
        `
          INSERT INTO model (name, "makeId") 
          VALUES ($1, $2)
          RETURNING *
        `,
        [name, makeId]
      );
      return models;
    } catch (error) {
      console.error('error in createModels in models.js', error);
    }
  }
  
  //select and return an array of all activities
  async function getAllModels() {
    try {
      const { rows: models } = await client.query(`
      SELECT * 
      FROM model
      `);
      return models;
    } catch (error) {
      console.error('error in getAllModels in models.js', error);
    }
  }
  
  async function getModelsById(id) {
    try {
      const {
        rows: [models],
      } = await client.query(
        `
      SELECT * 
      FROM model
      WHERE id=$1
      `,
        [id]
      );
      return models;
    } catch (error) {
      console.error('err in getModelsById in models.js', error);
    }
  }
  
  
  module.exports = {
    createModels,
  };