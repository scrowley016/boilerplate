const client = require("./client");

async function createCart({userId}) {
    
    const { rows: [cart] } = await client.query(`
    INSERT INTO cart ("usersId") 
    VALUES($1) 
    RETURNING *;
    `, [userId]);
  
    return cart;
  
  }

async function getAllCarts() {

    const { rows: cart } = await client.query(`
    SELECT * FROM cart;
    `,);

    return cart;

}

async function getCartById(id) {

    const { rows: [cart] } = await client.query(`
    SELECT * FROM cart
    WHERE id=$1;
  `, [id]);
  
  return cart;
  
  }

async function getCartByUserId({userId}) {

    const { rows: [cart] } = await client.query(`
    SELECT * FROM type
    WHERE "userId"=$1;
    `, [userId]);

return cart;

}

module.exports = {
    createCart,
    getAllCarts,
    getCartById,
    getCartByUserId
  };