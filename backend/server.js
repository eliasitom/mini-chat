const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  
app.use(cors());


io.on('connect', (socket) => {
  console.log('A client has connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('A client has disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}...`);
});
