const director = {
  mainSpeed: 10000,
  audioSpeed: 50000,
  speakerSpeed: 10000,
  mood: 0,
  intensity: 0,
  intimacy: 0,
  tick: function tick () {
    if (this.mainSpeed <= 3000) {
      this.mainSpeed = 40000
    } else {
      this.mainSpeed = this.mainSpeed - 500
    }
    console.log(this.mainSpeed)
  }
}

module.exports = director
