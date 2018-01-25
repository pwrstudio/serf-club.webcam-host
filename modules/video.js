// Dependencies
const mongoose = require('mongoose')
const colors = require('colors')
const Chance = require('chance')
const chance = new Chance()

// Models
const Stream = require('../models/stream.js')

// Modules
const config = require('./config.js')

module.exports = {
  db: {},
  init() {
    return new Promise((resolve, reject) => {
      mongoose.Promise = global.Promise
      mongoose.connect(config.mongodbUri)
      const connectionPromise = mongoose.connection

      connectionPromise
        .then(db => {
          this.db = db
          resolve('Video database connected')
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getRandomStream(options) {
    return new Promise((resolve, reject) => {
      const streamPromise = Stream.find(options)
      streamPromise.then(streams => {
        console.log(streams.length)
        resolve(chance.pickone(streams))
      })
      streamPromise.catch(err => {
        reject(err)
      })
    })
  }
}
