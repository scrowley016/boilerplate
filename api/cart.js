const express = require('express');
const apiRouter = express.Router();

const {
    createCart,
    getAllCarts,
    getCartById,
    updateCart,
    deleteCart
} = require('../db/cart');


// Get all carts
apiRouter.get('/', async (req, res, next) => {
    try {
        const cart = await getAllCarts()

    res.send(
        cart
    )
} catch(error) {
    next(error)
}
});

// Add new cart
apiRouter.post('/', async (req, res, next) => {
   try{
    const {userId} = req.body;

    const cart = await createCart({userId})

    res.send(
        cart
    )
}catch (error){
    next(error)
}
});

// Delete cart
apiRouter.delete('/:cartId', async (req, res, next) => {
    try{
    const id = req.params.cartId;
    const removeCart = await deleteCart(id);

    res.send(removeCart);
  
    }catch (error){
        next(error)
    }
});


module.exports = apiRouter;