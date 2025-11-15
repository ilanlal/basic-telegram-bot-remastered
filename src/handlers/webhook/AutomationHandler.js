class AutomationHandler {
    constructor(userProperties, activeSpreadsheet) {
        this._automationModel = AutomationModel.create(activeSpreadsheet);
        const token = userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
        if (!token) {
            throw new Error('Bot token is not set in user properties');
        }
        this._telegramBotProxy = TelegramBotProxy.create(token);
        this._languageCode = userProperties.getProperty(EnvironmentModel.InputMeta.LANGUAGE_CODE) || 'default';
    }

    static create(
        userProperties = PropertiesService.getUserProperties(),
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    ) {
        return new AutomationHandler(userProperties, activeSpreadsheet);
    }

    handleAutomationRequest({ language_code, chat_id, query, reply_to_message_id = null }) {
        if (!chat_id || !query) {
            throw new Error('Invalid automation request format');
        }

        // array of actions like [{method: 'sendMessage', payload: {...}}] to execute (as string)
        let apiActionsToDoList = this._automationModel.findData(query, language_code || this._languageCode);

        if (!apiActionsToDoList) {
            apiActionsToDoList = this._automationModel.findData('_action_not_found_', language_code || this._languageCode);
        }

        const actions = JSON.parse(apiActionsToDoList);

        // Execute the reply actions
        if (Array.isArray(actions)) {
            actions.forEach(action => {
                this.executeAction(chat_id, action, reply_to_message_id);
            });
        }

        // For testing purposes, return a simple status
        return JSON.stringify({ status: 'dynamic_reply_handled', chat_id, query, actions_executed: actions?.length || 0 });
    }

    executeAction(chat_id, action, reply_to_message_id) {
        let payload = action.payload || null;
        if (chat_id) {
            payload = payload || {};
            payload.chat_id = chat_id;
        }
        if (reply_to_message_id) {
            payload = payload || {};
            payload.reply_to_message_id = reply_to_message_id;
        }
        const uriAction = action.method;
        const response = this._telegramBotProxy.executeApiRequest(uriAction, payload);

        if (response.getResponseCode() !== 200) {
            throw new Error(`Failed to execute action ${uriAction}: ${response.getContentText()}`);
        }

        return response.getContentText();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutomationHandler };
}