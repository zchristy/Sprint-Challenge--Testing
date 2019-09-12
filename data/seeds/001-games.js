
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {
          title: 'Sonic The Hedgehog',
          genre: 'Action',
          releaseYear: 1995
        },
        {
          title: 'Zelda',
          genre: 'Adventure',
          releaseYear: 2001
        },
        {
          title: 'James Bond, Golden Eye',
          genre: 'Action',
          releaseYear: 2002
        }
      ]);
    });
};
