// Dependencies
const mongoose = require('mongoose')
const Chance = require('chance')
const chance = new Chance()
const PoissonProcess = require('poisson-process')

// Models
const Audio = require('../models/audio.js')

// Modules
const state = require('./state.js')
const director = require('./director.js')
const communicator = require('./communicator.js')

let switcher = 0

const composer = {
  start: function start () {

    const composerLoop = PoissonProcess.create(director.audioSpeed, function message() {

      const queryArgs = {}

      Audio
      .find(queryArgs)
      .exec(function (err, audioStreams) {

          // Handle error
        if (err) { console.log(err) }

        const selectedAudio = chance.pickone(audioStreams)

        if (switcher % 2 === 0) {
          state.soundOne = selectedAudio
        } else {
          state.soundTwo = selectedAudio
        }

        communicator.audio()

        switcher++

      })

    })

    composerLoop.start()

  }
}

module.exports = composer
