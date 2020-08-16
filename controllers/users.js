const path = require('path');
const { getFile } = require('../helpers');

const users = path.join(__dirname, '..', 'data', 'users.json');

const getAllUsers = (req, res) => {
  getFile(users)
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch((error) => res
      .status(500)
      .send({ message: `An error has occurred ${error}` }));
};

const getUser = (req, res) => {
  getFile(users)
    .then((data) => {
      // Находим текущего пользователя
      const currentUser = JSON.parse((data)).find((user) => user._id === req.params.id);
      if (!currentUser) {
        res
          .status(404)
          .send({ message: 'Нет пользователя с таким ID' });
      }
      res
        .status(200)
        .send(currentUser);
    })
    .catch((error) => res
      .status(500)
      .send({ message: `An error has occurred ${error}` }));
};

module.exports = {
  getAllUsers,
  getUser,
};
