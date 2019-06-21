const supertest = require('supertest')

const server = require('./server.js')

const db = require('../data/dbConfig.js')
const { find, findById, add, update, remove } = require('../models/models.js')

describe('server', () => {

  beforeEach(async () => {
    await db('games').truncate()
  })

  describe('GET /', () => {
    it('responds with 200', async () => {
      await supertest(server)
        .get('/')
        .expect(200)
    })

    it('responds with { message: "Hello from the backend!" }', async () => {

      await supertest(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual({ message: 'Hello from the backend!' })
        })
    })
  })

  describe('GET /api/games', () => {

    it('responds with 200 OK', async () => {
      await supertest(server)
        .get('/api/games')
        .expect(200)
    })

    it('responds with empty array of games', async () => {
      const gamesList = await find()
      await supertest(server)
        .get('/api/games')
        .then(res => {
          expect(res.body).toEqual(gamesList)
        })
    })

    it('responds with a list of games', async () => {
      await add({
        title: 'Zelda',
        genre: 'Adventure',
        releaseYear: 2001
      })
      await add({
        title: 'Sonic The Hedgehog',
        genre: 'Action',
        releaseYear: 1995
      })
      await add({
        title: 'James Bond, Golden Eye',
        genre: 'Action',
        releaseYear: 2002
      })

      const gamesList = await find()
      await supertest(server)
        .get('/api/games')
        .then(res => {
          expect(res.body).toEqual(gamesList)
          expect(res.body).toHaveLength(3)
        })
    })

  })

})
