const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;



// Import and use the chat router
const chatRouter = require('./routes/chat.router');


io.on('connection', (socket) => {
  console.log('A user connected');

  // Send all existing messages to the connected client
  Message.find()
    .sort({ createdAt: 1 })
    .then((messages) => {
      socket.emit('messages', messages);
    })
    .catch((error) => {
      console.error('Failed to fetch messages:', error);
    });

  // Handle incoming messages from clients
  socket.on('sendMessage', (data) => {
    const { sender, content } = data;

    // Create a new message
    const message = new Message({
      sender,
      content,
    });

    // Save the message to MongoDB
    message.save()
      .then(() => {
        // Broadcast the message to all connected clients
        io.emit('message', message);
      })
      .catch((error) => {
        console.error('Failed to save message:', error);
      });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
// Mount the chat router
app.use('/chat', chatRouter);



app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});



app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})