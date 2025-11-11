class PostMessageHandler {
    constructor(activeSpreadsheet) {
        this._spreadsheetService = SpreadsheetService
            .create(activeSpreadsheet);
    }

    static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new PostMessageHandler(activeSpreadsheet);
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
                    return this.handleBotCommand(chat_id, contents.message);
                }
            });
        }

        // reply from force input request
        if (contents.message.reply_to_message) {
            return this.handleReplyToForceInput(chat_id, contents.message);
        }

        // return "notdefined" const message for all other messages input
        return this.handleDynamicReply(chat_id, '_command_not_found_');
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
        // Handle /start command separately to verify persone.
        if (message.text.startsWith('/start')) {
            this.verifyPersone(message);
        }

        if (message.text === "/whoami" || message.text === "/me") {
            // return this.handleDynamicReply(chat_id, ["/start", "welcome"], message.message_id);
        }

        if (message.text === "/whoru" || message.text === "/whoareyou" || message.text === "/botinfo") {
            // return this.handleDynamicReply(chat_id, ["/start", "welcome"], message.message_id);
        }

        return this.handleDynamicReply(chat_id, message.text, message.message_id);
    }

    // reply from force input request
    handleReplyToForceInput(chat_id, message) {
        // Implement reply to message handling logic here
        return JSON.stringify({ status: 'reply_to_force_input_handled', chat_id, message });
    }

    handleDynamicReply(chat_id, name, reply_to_message_id = null) {
        // Implement dynamic reply handling logic here
        return JSON.stringify({ status: 'dynamic_reply_handled', name, reply_to_message_id });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PostMessageHandler };
}