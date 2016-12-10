var mongoose = require('mongoose')

var streamSchema = new mongoose.Schema({
  url: String,
  format: String,
  online: Boolean,
  description: String,
  location: String,
  timezone: Number,
  intensity: Number,
  intimacy: Number
})

module.exports = mongoose.model('streams', streamSchema)
