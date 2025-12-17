class PostMessageHandler {
    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this._activeSpreadsheet = activeSpreadsheet;
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
    }

    static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        documentProperties = PropertiesService.getDocumentProperties(),
        userProperties = PropertiesService.getUserProperties(),
        scriptProperties = PropertiesService.getScriptProperties()) {
        return new PostMessageHandler(activeSpreadsheet, documentProperties, userProperties, scriptProperties);
    }

    handlePostMessage(message) {
        if (!message || !message.from) {
            throw new Error('Invalid message format');
        }

        const chat_id = message.from.id;
        const language_code = message.from.language_code;
        const query = message.text;
        if (message.entities && Array.isArray(message.entities)) {
            message.entities.forEach(entity => {
                if (entity.type === "bot_command") {
                    // Handle bot command
                    return this.handleBotCommand(chat_id, message);
                }
            });
        }

        if (message?.successful_payment) {
            // Handle successful payment
            return this.processMessageDynamicResponse(chat_id, '_payment_successful_', language_code, message.message_id);
        }

        // reply from force input request
        if (message.reply_to_message) {
            return this.handleReplyToForceInput(chat_id, message);
        }

        // execute dynamic reply handling for the query
        return true; //this.handleDynamicReply(chat_id, query, language_code, message.message_id);
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

        return this.processMessageDynamicResponse(chat_id, query, language_code);
    }

    verifyPersone(message) {
        if (!message.from || !message.from.id) {
            throw new Error('Invalid message format: missing from.id');
        }

        return CustomerController
            .create(this._documentProperties, this._activeSpreadsheet)
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

    processMessageDynamicResponse(chat_id, query, language_code) {
        const automationHandler = AutomationHandler
            .create(this._activeSpreadsheet, this._documentProperties, this._userProperties, this._scriptProperties);

        // Execute the dynamic reply handling on the local container message_id
        return automationHandler.handleAutomationRequest({
            language_code,
            chat_id,
            query,
            reply_to_message_id: null
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PostMessageHandler };
}