class WebhookHandler {
    constructor() {
        this.contents = null;
    }

    handlePost(contents) {
        this.contents = contents;
        try {
            if (this.contents.callback_query) {
                //ssContext.log("doPost", "callback_query", this.chat_id, this.contents.callback_query.data, JSON.stringify(this.contents));
                return this.handlePostCallbackQuery(this.contents);
            } else if (this.contents.message) {
                if (this.contents.message?.from?.id !== 777000) {
                    //ssContext.log("doPost", "message", this.chat_id, this.contents.message.text, JSON.stringify(this.contents));
                }
                return this.handlePostMessage(this.contents);
            }
        } catch (error) {
            throw error;
        }

        return JSON.stringify({ status: 'not_handled' });
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

    handlePostCallbackQuery(contents) {
        if (!contents.callback_query || !contents.callback_query.from) {
            throw new Error('Invalid callback_query format');
        }
        const chat_id = contents.callback_query.from.id;
        const language_code = contents.callback_query.from.language_code;
        const data = contents.callback_query.data;
        // todo: send loading answer callback query
        //vm.sendLoadingAnswerCallbackQuery(contents.callback_query.id);
        //vm.handleCallbackQuery(chat_id, contents.callback_query);
        return JSON.stringify({ status: 'callback_query_received' });
    }

    handleCallbackQuery(chat_id, data) {
        // Implement callback query handling logic here
        return JSON.stringify({ status: 'callback_query_handled' });
    }

    verifyPerson(message) {
        // Implement verification logic here
        return true;
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
        return JSON.stringify({ status: 'bot_command_handled' });
    }

    handleReplyToMessage(chat_id, message) {
        // Implement reply to message handling logic here
        return JSON.stringify({ status: 'reply_to_message_handled' });
    }

    handleDynamicReply(chat_id, commands, reply_to_message_id = null) {
        // Implement dynamic reply handling logic here
        return JSON.stringify({ status: 'dynamic_reply_handled' });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WebhookHandler
    };
}