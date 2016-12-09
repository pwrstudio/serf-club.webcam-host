var mongoose = require('mongoose')

var soundSchema = new mongoose.Schema()

module.exports = mongoose.model('sound', sooundSchema)
