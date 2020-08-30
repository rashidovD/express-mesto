const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Ошибка на сервере: ${err.message}` }));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .catch((err) => {
      throw new BadRequestError({ message: `Неверные данные: ${err.message}` });
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Не найдено с таким ID' });
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Не найдено с таким ID' });
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Не найдено с таким ID' });
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
