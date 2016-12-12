const Chance = require('chance')
const chance = new Chance()
const colors = require('colors')

const director = {
  mainSpeed: 10000,
  reducer: 1000,
  audioSpeed: 50000,
  speakerSpeed: 20000,
  intense: false,
  intenseCounter: 10,
  // intimate: false,
  exterior: true,
  // night: true,
  tick: function tick () {

    if(this.intense && this.intenseCounter > 0) {
      console.log('intenseRound', this.intenseCounter )
      this.intenseCounter--
      this.mainSpeed = chance.integer({min: 1000, max: 3000})
    } else {
      // Every 5th time on average: switch to intense
      if(chance.weighted(['calm', 'intense'], [5, 1]) === 'calm') {
        this.intense = false
        console.log('calm')
        this.mainSpeed = chance.integer({min: 10000, max: 40000})
      } else {
        console.log('intense')
        this.intense = true
        this.intenseCounter = 10
        this.mainSpeed = chance.integer({min: 1000, max: 3000})
      }
    }

  }
}

module.exports = director
