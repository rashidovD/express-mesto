const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:_id', deleteCard);
cardsRouter.put('/:_id/likes', likeCard);
cardsRouter.delete('/:_id/likes', dislikeCard);

module.exports = cardsRouter;
