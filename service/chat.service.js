const chatRepository  = require('../repository/chat.repository');

class ChatService {

    constructor() {}

    async getChatMessage(sender,receiver) {
        return await chatRepository.getChatMessage(sender,receiver);
    }

    async sendChatMessage(sender,receiver,content) {
        return await chatRepository.sendChatMessage(sender,receiver,content);
    }

    async updateChatMessage(chat) {
        return await chatRepository.updateChatMessage(chat);
    }

    async deleteChatMessage(chatId) {
        return await chatRepository.deleteChatMessage(chatId);
    }

}

module.exports = new ChatService();