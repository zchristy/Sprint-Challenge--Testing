
module.exports = {
  validateGame
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
