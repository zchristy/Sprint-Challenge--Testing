const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findById,
  remove,
  update
};

function find() {
  return db('games').select('id', 'title', 'genre', 'releaseYear');
}

function findById(id) {
  return db('games')
    .where({ id })
    .first();
}

async function add(game) {
  const [id] = await db('games').insert(game);

  return findById(id);
}

function update(id, changes) {
  return db('games')
  .where({ id })
  .update(changes, '*');
}

function remove(id) {
  return db('games')
  .where({ id })
  .del();
}
