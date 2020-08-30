const express = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:_id', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
