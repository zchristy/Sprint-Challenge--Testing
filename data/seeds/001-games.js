
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {
          title: 'Tango and Cash',
          genre: 'Action',
          releaseYear: 1987
        },
        {
          title: 'Chitty Chitty Bang Bang',
          genre: 'Comedy',
          releaseYear: 1968
        },
        {
          title: 'The Pink Panther',
          genre: '',
          releaseYear: 1963
        }
      ]);
    });
};
