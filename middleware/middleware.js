const model = require('../models/models.js')

module.exports = {
  validateGame,
  validateGameId,
};

function validateGame(req, res, next) {
  const { title, genre, releaseYear } = req.body
  if(Object.keys(req.body).length) {
    if(title && genre) {
      req.game = {
        title: title,
        genre: genre,
        releaseYear: releaseYear
      }
      next()
    } else {
      res.status(422).json({ message: "missing required fields" })
    }
  } else {
    res.status(400).json({ message: "missing game data" })
  }

};

function validateGameId(req, res, next) {
  const { id } = req.params

    model.findById(id)
    .then(game => {
      if(game) {
        req.gameId = game.id
        next()
      } else {
        res.status(404).json({ message: "invalid game id" })
      }
    })
    .catch(err => {
      res.status(500).json({error: "Internal Server Error"})
    })

};
