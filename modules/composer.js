// Dependencies
const mongoose = require('mongoose')
const Chance = require('chance')
const chance = new Chance()
// Models
const Sound = require('../models/sound.js')
// Config
const config = require('../config/config.js')

const composer = {
  init: function init () {},
  play: function play () {}
}

module.exports = composer
