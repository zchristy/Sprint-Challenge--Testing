const express = require('express');

const games = require('../models/models.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the backend!' });
});

server.get('/api/games', (req, res) => {
  games.find()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/games/:id', (req, res) => {
  const { id } = req.params

  games.findById(id)
    .then(game => {
      res.status(200).json(game);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/api/games', (req, res) => {

  games.add(req.body)
    .then(game => {
      res.status(201).json(game);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.put('/api/games/:id', (req, res) => {
  const { id } = req.params

  games.update(id, req.body)
    .then(game => {
      res.status(200).json(game);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete('/api/games/:id', (req, res) => {
  const { id } = req.params

  games.remove(id)
    .then(id => {
      res.status(200).json({message: "Your game has been deleted"});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
