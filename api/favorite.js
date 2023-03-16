const express = require('express');
const apiRouter = express.Router();

const {
  addCarToFavorite,
  getFavoriteById,
  getFavoriteByUserId,
  updateFavorite,
  destroyFavorite,
} = require('../db');

// PATCH /api/favorite/:userId
apiRouter.patch('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId;
    const username = req.user.username;
    const userId = req.user.id;

    const addFavorite = await updateFavorite();
  } catch (error) {
    console.error('err in patch /api/favorite/:userId', error);
  }
});

// DELETE /api/favorite/:userId
apiRouter.delete('/:userId', async (req, res, next) => {
  const id = req.params.userId;
});

module.exports = apiRouter;
