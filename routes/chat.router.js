const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat.controller');


router.get('/', (req, res) => {
   const {sender,reciever} = req.body;
   chatController.getChatMessage(sender,reciever).then(data => res.json(data));
});


// Route: Create a new profile
router.post('/',(req, res) => {
   console.log("body", req.body);
   const {sender,reciever,content} = req.body;
   chatController.handleMessage(sender,reciever,content).then(data => res.json(data));
});

// Route: Update a profile
router.put('/:id', (req, res) => {
   chatController.updateChatMessage(req.params.id, req.body).then(data => res.json(data));
});

// Route: Delete a specific profile
router.delete('/:id', (req, res) => {
   chatController.deleteChatMessage(req.params.id).then(data => res.json(data));
});




router.get('/message', (req, res) => {
   chatController.getChats().then(data => res.json(data))

})

module.exports = router;




