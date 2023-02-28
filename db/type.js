const client = require("./client");

async function createType({name}) {
    
    const { rows: [type] } = await client.query(`
    INSERT INTO type (name) 
    VALUES($1) 
    RETURNING *;
    `, [name]);
  
    return type;
  
  }

async function getAllTypes() {

    const { rows: types } = await client.query(`
    SELECT * FROM type;
    `,);

    return types;

}

async function getTypeById(id) {

    const { rows: [type] } = await client.query(`
    SELECT * FROM type
    WHERE id=$1;
  `, [id]);
  
  return type;
  
  }

async function getTypeByName(name) {

    const { rows: [type] } = await client.query(`
    SELECT * FROM type
    WHERE name=$1;
    `, [name]);

return type;

}

module.exports = {
    createType,
    getAllTypes,
    getTypeById,
    getTypeByName
  };