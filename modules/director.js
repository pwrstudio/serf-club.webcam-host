// Dependencies
const Chance = require('chance')
const chance = new Chance()
// Config
const config = require('../config/config.js')
// Modules
const state = require('./state.js')

const director = {
  init: function start () {
    console.log(director)
  },
  tick: function tick () {

  }
}

module.exports = director
