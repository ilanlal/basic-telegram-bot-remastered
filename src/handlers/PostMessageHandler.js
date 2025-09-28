class PostMessageHandler {
    constructor() {
        this._spreadsheetService = SpreadsheetService.create(
            SpreadsheetApp.getActiveSpreadsheet());
    }
    
    static create() {
        return new PostMessageHandler();
    }

    handlePostMessage(contents) {
        if (!contents.message || !contents.message.from) {
            throw new Error('Invalid message format');
        }

        const chat_id = contents.message.from.id;
        const language_code = contents.message.from.language_code;
        const text = contents.message.text;

        if (contents.message.entities) {
            contents.message.entities.forEach(entity => {
                if (entity.type === "bot_command") {
                    // Handle bot command
                    if (contents.message.text.startsWith('/start')) {
                        this.verifyPersone(contents.message);
                    }

                    return this.handleBotCommand(chat_id, contents.message);
                }
            });
        }

        // reply from force input request
        if (contents.message.reply_to_message) {
            return this.handleReplyToMessage(chat_id, contents.message);
        }

        // return "notdefined" const message for all other messages input
        return this.handleDynamicReply(chat_id, ['/start', '_notdefined']);
    }

    verifyPersone(message) {
        if (!message.from || !message.from.id) {
            throw new Error('Invalid message format: missing from.id');
        }

        const user = SpreadsheetService.Users.getUserById(message.from.id);
        if (user) {
            return user;
        }

        return SpreadsheetService.Users.addUser(
            message.from.id,
            {
                username: message.from.username,
                first_name: message.from.first_name,
                last_name: message.from.last_name,
                language_code: message.from.language_code
            });
    }

    handleBotCommand(chat_id, message) {
        if (message.text === "/start") {
            return this.handleDynamicReply(chat_id, ["/start", "welcome"], message.message_id);
        }

        if (message.text === "/help") {
            return this.handleDynamicReply(chat_id, ["/help", "help"], message.message_id);
        }

        if (message.text === "/about") {
            return this.handleDynamicReply(chat_id, ["/about", "about"], message.message_id);
        }

        // Implement bot command handling logic here
        return JSON.stringify({ status: 'bot_command_handled', chat_id, command: message.text });
    }

    handleReplyToMessage(chat_id, message) {
        // Implement reply to message handling logic here
        return JSON.stringify({ status: 'reply_to_message_handled', chat_id, message });
    }

    handleDynamicReply(chat_id, commands, reply_to_message_id = null) {
        // Implement dynamic reply handling logic here
        return JSON.stringify({ status: 'dynamic_reply_handled', commands, reply_to_message_id });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PostMessageHandler
    };
}