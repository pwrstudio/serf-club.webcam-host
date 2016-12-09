// Dependencies
var mongoose = require('mongoose')
var Chance = require('chance')
var chance = new Chance()
// Models
var Sound = require('../models/sound.js')
// Config
var config = require('../config/config.js')

var composer = {
  init: function init () {},
  play: function play () {}
}

module.exports = composer
