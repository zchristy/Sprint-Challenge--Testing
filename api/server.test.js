const supertest = require('supertest')

const server = require('./server.js')

const db = require('../data/dbConfig.js')
const { validateGame } = require('../middleware/middleware.js')
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

  describe('POST /api/games', () => {

    it('responds with 201 CREATED', async () => {
      const game = {
        title: 'Zelda',
        genre: 'Adventure',
        releaseYear: 2001
      }

      await supertest(server)
        .post(`/api/games`)
        .send(game)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
    })

    it('responds with 422 when information is incomplete', async () => {
      const game = {
        tite: 'Zelda',
        genre: 'Adventure',
        releaseYear: 2001
      }

      await supertest(server)
        .post(`/api/games`, validateGame)
        .send(game)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
    })

    it('responds with posted game', async () => {
      const game = {
        title: 'Zelda',
        genre: 'Adventure',
        releaseYear: 2001
      }

      await supertest(server)
        .post(`/api/games`)
        .send(game)
        .then(res => {
          expect(res.body.name).toEqual(game.name)
        })
    })

  })

  describe('GET /api/games/:id', () => {

    it('responds with 200 OK', async () => {
      const game = {
        title: 'Zelda',
        genre: 'Adventure',
        releaseYear: 2001
      }

      await supertest(server)
        .post(`/api/games`)
        .send(game)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

      const id = 1

      await supertest(server)
        .get(`/api/games/${id}`)
        .expect(200)
    })

    it('responds with 404 with invalid id', async () => {
      const game = {
        title: 'Zelda',
        genre: 'Adventure',
        releaseYear: 2001
      }

      await supertest(server)
        .post(`/api/games`)
        .send(game)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

      const id = 2

      await supertest(server)
        .get(`/api/games/${id}`)
        .expect(404)
    })

    it('responds specific game by id', async () => {
      const game = {
        title: 'Zelda',
        genre: 'Adventure',
        releaseYear: 2001
      }

      await supertest(server)
        .post(`/api/games`)
        .send(game)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

      const id = 1

      const found = await findById(id)
      await supertest(server)
        .get(`/api/games/${id}`)
        .then(res => {
          expect(res.body).toEqual(found)
        })
    })

  })

})
