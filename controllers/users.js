const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Такого пользователя нет' });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .catch((err) => {
      throw new BadRequestError({ message: `Некорректные данные: ${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => new NotFoundError({ message: 'Такого пользователя нет' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new BadRequestError({ message: `incorrect data: ${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => new NotFoundError({ message: 'Такого пользователя нет' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new BadRequestError({ message: `incorrect data: ${err.message}` });
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
