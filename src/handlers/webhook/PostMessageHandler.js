class PostMessageHandler {
    constructor(activeSpreadsheet, userProperties) {
        this._activeSpreadsheet = activeSpreadsheet;
        this._userProperties = userProperties;
    }

    static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), userProperties = PropertiesService.getUserProperties()) {
        return new PostMessageHandler(activeSpreadsheet, userProperties);
    }

    handlePostMessage(message) {
        if (!message || !message.from) {
            throw new Error('Invalid message format');
        }

        const chat_id = message.from.id;
        const language_code = message.from.language_code;
        const text = message.text;

        if (message?.successful_payment) {
            // Handle successful payment
            return this.handleDynamicReply(chat_id, '_payment_successful_');
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

        // return "notdefined" const message for all other messages input
        return this.handleDynamicReply(chat_id, '_command_not_found_');
    }

    handleBotCommand(chat_id, message) {
        const command = message.text?.split(' ')[0];
        const language_code = message.from?.language_code || 'default';
        const message_id = message.message_id;
        // Handle /start command separately to verify persone.
        if (command === '/start') {
            this.verifyPersone(message);
        }

        if (command === "/whoami" || command === "/me") {
            // return this.handleDynamicReply(chat_id, ["/start", "welcome"], message.message_id);
        }

        if (command === "/whoru" || command === "/whoareyou" || command === "/botinfo") {
            // return this.handleDynamicReply(chat_id, ["/start", "welcome"], message.message_id);
        }

        if (command === "/admin") {
        }

        return this.handleDynamicReply(chat_id, command, language_code, message_id);
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

    handleDynamicReply(chat_id, name, language_code = 'default', reply_to_message_id = null) {
        const token = this._userProperties
            .getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN) || '[YOUR_TELEGRAM_BOT_TOKEN]';

        const automationHandler = AutomationHandler
            .create(token, language_code, this._activeSpreadsheet);

        const response = automationHandler.handleAutomationRequest({
            chat_id,
            name,
            reply_to_message_id
        });

        return JSON.stringify({ status: 'dynamic_reply_handled', response });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PostMessageHandler };
}