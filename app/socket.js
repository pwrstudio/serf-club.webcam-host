module.exports = function (app, io) {
  io.on('connection', function (socket) {
    console.log('connection made')
    socket.emit('init', {
      state: 'x'
    })
  })
}
