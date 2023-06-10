const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);
// Import and use the chat router and controllers
const chatController = require('./controller/chat.controller');
const chatRouter = require('./routes/chat.router');


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  chatController.handleMessage(socket);

  socket.on('joinRoom', (room) => {
    console.log('User joined room:', room);
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



// Mount the chat router
app.use('/api/messages', chatRouter);



app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});



app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})