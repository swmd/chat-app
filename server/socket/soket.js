module.exports = (server) => {
  var socket = require('socket.io');

  io = socket(server);

  io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', function (data) {
      io.emit('RECEIVE_MESSAGE', data);
    })
  });
}