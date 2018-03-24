module.exports = (server, db) => {
  var socket = require('socket.io');
  const ChatModel = require('../models/chat');
  const { ObjectId } = require('mongodb');
  const moment = require("moment");

  const chatModel = new ChatModel(db, ObjectId);
  const HOUR = 1000 * 60 * 60;
  io = socket(server);

  io.on('connection', (socket) => {

    socket.on('SEND_MESSAGE', function (data) {
      data.creatAt = moment().unix();
      return chatModel.insertMessage(data)
        .then((id) => {
          if (id) {
            io.emit('RECEIVE_MESSAGE', data);
          }
        });
    });

    socket.on('GET_ALL_MESSAGES', function () {
      const beforeSevenDays = moment().subtract(7, 'day').unix();
      return chatModel.findByDate(beforeSevenDays)
        .then((messages) => {
          io.emit('RECEIVE_ALL_MESSAGE', messages);
        });
    })
  });
}