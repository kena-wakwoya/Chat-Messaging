const { connect, disconnect } = require('../config/db.config');
const { Message } = require('../model/chat.model');
const logger = require('../logger/api.logger');

class ChatRepository {

    constructor() {
        connect();
    }

    async getChatMessage(sender,receiver) {

        const chats = Message.find({
            $or: [
              { sender, receiver },
              { sender: receiver, receiver: sender },
            ],
          }).sort('timestamp');
        return chats;
    }

    async sendChatMessage(sender, receiver, content) {
        const message = new Message({ sender, receiver, content });
        message.save();
        return message;
    }

    async updateChatMessage(chat) {
        let data = {};
        try {
            data = await Message.updateOne(chat);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteChatMessage(chatId) {
        let data = {};
        try {
            data = await Message.deleteOne({_id : chatId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new ChatRepository();



