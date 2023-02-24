const client = require("./client");

async function createType() {
    
    const { rows: type } = await client.query(`
    INSERT INTO type (name) 
    VALUES($1) 
    RETURNING *;
    `);
  
    return type;
  
  }

module.exports = {
    createType
  };