class AutomationHandler {
    constructor(token, language_code, activeSpreadsheet) {
        this._automationModel = AutomationModel
            .create(activeSpreadsheet);
        this._telegramBotProxy = TelegramBotProxy
            .create(token);
        this._languageCode = language_code;
    }

    static create(token = '[YOUR_TELEGRAM_BOT_TOKEN]', language_code = 'default', activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new AutomationHandler(token, language_code, activeSpreadsheet);
    }

    handleAutomationRequest({ chat_id, name, reply_to_message_id = null }) {
        if (!chat_id || !name) {
            throw new Error('Invalid automation request format');
        }

        // array of actions like {method: 'sendMessage', payload: {...}} to execute (as string)
        let reply = this._automationModel.getReplyByKey(name, this._languageCode);

        if (!reply) {
            reply = this._automationModel.getReplyByKey('_action_not_found_', this._languageCode);
        }

        const actions = JSON.parse(reply);
        // Execute the reply actions
        if (Array.isArray(actions)) {
            actions.forEach(action => {
                this.executeAction(chat_id, action, reply_to_message_id);
            });
        }

        // For testing purposes, return a simple status
        return JSON.stringify({ status: 'dynamic_reply_handled' });
    }

    executeAction(chat_id, action, reply_to_message_id) {
        const payload = Object.assign({}, action.payload, {
            chat_id: chat_id,
            reply_to_message_id: reply_to_message_id
        });
        const uriAction = action.method;
        const result = this._telegramBotProxy.executeApiRequest(uriAction, payload);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutomationHandler };
}