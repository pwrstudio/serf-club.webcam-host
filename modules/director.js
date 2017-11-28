"use strict"
const Chance = require('chance')
const chance = new Chance()

const director = {
  mainSpeed: 5000,
  reducer: 1000,
  audioSpeed: 10000,
  speakerSpeed: 20000,
  intense: false,
  intenseCounter: 10,
  exterior: true,
  tick: function tick () {

    this.mainSpeed = 20000

  }
}

module.exports = director
