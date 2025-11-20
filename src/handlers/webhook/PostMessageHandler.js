class PostMessageHandler {
    constructor(userProperties, activeSpreadsheet) {
        this._activeSpreadsheet = activeSpreadsheet;
        this._userProperties = userProperties;
    }

    static create(userProperties = PropertiesService.getDocumentProperties(), activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new PostMessageHandler(userProperties, activeSpreadsheet);
    }

    handlePostMessage(message) {
        if (!message || !message.from) {
            throw new Error('Invalid message format');
        }

        const chat_id = message.from.id;
        const language_code = message.from.language_code;
        const query = message.text;

        if (message?.successful_payment) {
            // Handle successful payment
            return this.handleDynamicReply(chat_id, '_payment_successful_', language_code, message.message_id);
        }

        if (message.entities && Array.isArray(message.entities)) {
            message.entities.forEach(entity => {
                if (entity.type === "bot_command") {
                    // Handle bot command
                    return this.handleBotCommand(chat_id, message);
                }
            });
        }

        // reply from force input request
        if (message.reply_to_message) {
            return this.handleReplyToForceInput(chat_id, message);
        }

        // execute dynamic reply handling for the query
        return this.handleDynamicReply(chat_id, query, language_code, message.message_id);
    }

    handleBotCommand(chat_id, message) {
        const query = message.text?.split(' ')[0];
        const language_code = message.from?.language_code || 'default';
        const message_id = message.message_id;
        // Handle /start command separately to verify persone.
        if (query === '/start') {
            this.verifyPersone(message);
        }

        if (query === "/whoami" || query === "/me") {
            // TODO: implement whoami command handling
        }

        if (query === "/whoru" || query === "/whoareyou" || query === "/botinfo") {
            // TODO: implement botinfo command handling
        }

        if (query === "/admin") {
            // TODO: implement admin command handling
        }

        return true;
    }

    verifyPersone(message) {
        if (!message.from || !message.from.id) {
            throw new Error('Invalid message format: missing from.id');
        }

        return CustomerController
            .create(this._userProperties, this._activeSpreadsheet)
            .verifyCustomer(message);
    }
    // reply from force input request
    handleReplyToForceInput(chat_id, message) {
        // Implement reply to message handling logic here
        return JSON.stringify({ status: 'reply_to_force_input_handled', chat_id, message });
    }

    handleSuccessfulPayment(chat_id, payment) {
        // Implement successful payment handling logic here
        return JSON.stringify({ status: 'payment_handled', chat_id, payment });
    }

    handleDynamicReply(chat_id, query, language_code, reply_to_message_id = null) {
        const automationHandler = AutomationHandler
            .create(this._userProperties, this._activeSpreadsheet);

        return automationHandler.handleAutomationRequest({
            language_code,
            chat_id,
            query,
            reply_to_message_id
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PostMessageHandler };
}