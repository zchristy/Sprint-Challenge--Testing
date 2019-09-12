const supertest = require('supertest')

const db = require('../data/dbConfig.js')
const { find, findById, add, remove, update } = require('../models/models.js')

describe('games model', () => {

  beforeEach(async () => {
    await db('games').truncate()
  })

    it('is process.env.DB_ENV is pointing to testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    describe('add()', () => {

        it('add games', async () => {
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

          const games = await db('games')

          expect(games).toHaveLength(3)
        })

        it('add provided game', async () => {
          let game = {
            title: 'Zelda',
            genre: 'Adventure',
            releaseYear: 2001
          }
          let added = await add(game)
          expect(added.name).toBe(game.name)
        })
    })

    describe('find()', () => {

        it('find all games', async () => {
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

          const games = await find()

          expect(games).toHaveLength(3)
        })

        it('find game by id', async () => {
          const found = await add({
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

          const game = await findById(1)

          expect(game).toEqual(found)
        })

    })

    describe('remove()', () => {

        it('remove specific game', async () => {
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

          await remove(1)

          const games = await db('games')

          expect(games).toHaveLength(2)
        })

    })

    describe('update()', () => {

        it('update specific game', async () => {
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

          const changes = {
            title: 'Zelda - Ocarina of Time',
            genre: 'Adventure',
            releaseYear: 2001
          }

          await update(1, changes)

          const updated = await findById(1)

          expect(updated.name).toEqual(changes.name)
        })

    })
})
