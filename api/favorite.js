const express = require('express');
const apiRouter = express.Router();

const {
  addCarToFavorite,
  getFavoriteById,
  getFavoriteByUserId,
  destroyFavorite,
} = require('../db');

// PATCH /api/favorite/:userId
apiRouter.patch('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId;
    const username = req.user.username;
    const userId = req.user.id;
  } catch (error) {
    console.error('err in patch /api/favorite/:userId', error);
  }
});

// DELETE /api/favorite/:userId
apiRouter.delete('/:userId', async (req, res, next) => {
  const id = req.params.userId;
});
