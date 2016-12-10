var mongoose = require('mongoose')

var audioSchema = new mongoose.Schema({
  url: String
})

module.exports = mongoose.model('audio', audioSchema, 'audio')
