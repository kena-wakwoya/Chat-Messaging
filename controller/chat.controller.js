const chatService  = require('../service/chat.service');
const logger = require('../logger/api.logger');

class ChatController {

    async getChatMessage(sender,receiver) {
        logger.info('Controller: getChats')
        return await chatService.getChatMessage(sender,receiver);
    }

    async handleMessage(socket){
        socket.on('newMessage',(sender,receiver,content)=>{
            chatService.sendChatMessage(sender,receiver,content).then(()=>{
                socket.to(receiver).emit('newMessage',sender,receiver,content);
            })
        })
    }

    async updateChatMessage(chat) {
        logger.info('Controller: updateChat', chat);
        return await chatService.updateChatMessage(chat);
    }

    async deleteChatMessage(chatId) {
        logger.info('Controller: deleteChat', chatId);
        return await chatService.deleteChatMessage(chatId);
    }
}
module.exports = new ChatController();