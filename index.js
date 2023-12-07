const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {
  io.emit('conversations', {
    archived: false,
    id: 'adfaonfainf',
    type: 'personal',
    isMuted: false,
    isReadonly: false,
    lastMessage: '',
    muteExpiration: '',
    name: '',
    pinned: false,
    timestamp: '',
    unreadCount: 0,
  })
  console.log('A user connected with id : ' + socket.id);

  // Listen for messages from clients
  socket.on('message', (msg) => {
    console.log('message: ' + msg);

    // Broadcast the message to all connected clients
    io.emit('message', msg);
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected with id : ');
  });
});

server.listen(3000, () => {
  console.log('Server listening on *:3000');
});
