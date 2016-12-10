const director = {
  mainSpeed: 10000,
  audioSpeed: 50000,
  mood: 0,
  intensity: 0,
  intimacy: 0,
  tick: function tick () {
    if(this.mainSpeed <= 4000) {
      this.mainSpeed = 30000
    } else {
      this.mainSpeed = this.mainSpeed - 100
    }
    console.log(this.mainSpeed)
  }
}

module.exports = director
