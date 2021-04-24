const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Client connected [id=${socket.id}]`);

  socket.on('message', (data) => {
    console.log('message: ', JSON.stringify(data));
    io.emit('message', { text: data.msg, time: new Date().toISOString() });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected [id=${socket.id}]`);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
