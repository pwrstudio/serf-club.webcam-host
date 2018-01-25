// Dependencies
const mongoose = require('mongoose')
const Chance = require('chance')
const chance = new Chance()
const PoissonProcess = require('poisson-process')

// Models
const Audio = require('../models/audio.js')
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
          resolve('Audio database connected')
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getNoise() {
    return new Promise((resolve, reject) => {
      const audioPromise = Audio.find({})
      audioPromise.then(audio => {
        console.log('audio lenght', audio.length)
        resolve(chance.pickone(audio))
      })
      audioPromise.catch(err => {
        reject(err)
      })
    })
  }
}
