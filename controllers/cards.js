const path = require('path');
const { getFile } = require('../helpers');

const cards = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  getFile(cards)
    .then((data) => {
      res
        .status(200)
        .send(JSON.parse(data));
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: `Ошибка тут как тут ${error}` });
    });
};

module.exports = {
  getCards,
};
