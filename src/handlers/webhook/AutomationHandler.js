class AutomationHandler {
    constructor(userProperties, activeSpreadsheet) {
        this._automationModel = AutomationModel.create(activeSpreadsheet);
        const token = userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
        if (!token) {
            throw new Error('Bot token is not set in user properties');
        }
        this._telegramBotProxy = TelegramBotProxy.create(token);
        this._defaultLanguageCode = userProperties.getProperty(EnvironmentModel.InputMeta.LANGUAGE_CODE) || 'default';
        this._userProperties = userProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    static create(
        userProperties = PropertiesService.getDocumentProperties(),
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    ) {
        return new AutomationHandler(userProperties, activeSpreadsheet);
    }

    handleAutomationRequest({ language_code, chat_id, query, reply_to_message_id = null, callback_query_id = null }) {
        if (!chat_id || !query) {
            throw new Error('Invalid automation request format');
        }

        // Find actions for the query
        const actions = this.findActionsForQuery(query, language_code);
        if (actions.length === 0) {
            return JSON.stringify({ status: 'no_actions_found', chat_id, query });
        }
        let localReplyToMessageId = reply_to_message_id;
        let lastActionResult = null;

        // Execute the reply actions
        actions.forEach((action, index) => {
            lastActionResult = this.executeAction(chat_id, action, localReplyToMessageId, callback_query_id);
            // Update localReplyToMessageId for chaining actions that depend on previous message
            const actionContent = JSON.parse(lastActionResult);
            localReplyToMessageId = actionContent.result?.message_id || localReplyToMessageId;
        });

        // For testing purposes, return a simple status        
        return JSON.stringify({ status: 'dynamic_reply_handled', chat_id, query, actions_executed: actions?.length || 0, last_action_result: lastActionResult });
    }

    executeAction(chat_id, action, reply_to_message_id, callback_query_id = null) {
        LoggerModel.create(this._userProperties, this._activeSpreadsheet)
            .logEvent({
                dc: 'automation_action',
                action: action.method || '_no_method_',
                chat_id: chat_id || '0000',
                content: JSON.stringify(action),
                event: `reply_to_message_id: ${reply_to_message_id || 'none'} | callback_query_id: ${callback_query_id || 'none'}`
            });

        // Handle delay if specified
        if (action.delay_ms && !isNaN(action.delay_ms)) {
            Utilities?.sleep?.(action.delay_ms);
        }

        // Handle next action chaining
        if (action.next) {
            // Chain the next action after a delay
            const summeryResponseText = this.handleAutomationRequest({
                language_code: this._defaultLanguageCode,
                chat_id,
                query: action.next,
                reply_to_message_id,
                callback_query_id
            });

            return JSON.parse(summeryResponseText)?.last_action_result || "{}";
        }

        let payload = action.payload || null;
        const method = action.method || '';

        // If it's an answerCallbackQuery, add callback_query_id to payload
        if (chat_id && !method.startsWith('answerCallbackQuery')) {
            payload = payload || {};
            payload.chat_id = chat_id;
        }

        if ((method.startsWith('edit') || method.startsWith('delete')) && !reply_to_message_id) {
            return JSON.stringify({ status: 'skipped_action_missing_message_id', method, chat_id });
        }

        // if action.method is starting with 'edit' or 'delete', add message_id to payload
        if ((method.startsWith('edit') || method.startsWith('delete')) && reply_to_message_id) {
            payload = payload || {};
            payload.message_id = reply_to_message_id;
        }

        // Add reply_to_message_id if provided

        const uriAction = method;
        const response = this._telegramBotProxy.executeApiRequest(uriAction, payload);

        if (response?.getResponseCode() !== 200) {
            throw new Error(`Failed to execute action ${uriAction}: ${response?.getContentText() || 'No response'}`);
        }

        return response.getContentText();
    }

    findActionsForQuery(query, language_code) {
        // array of actions like [{method: 'sendMessage', payload: {...}}] to execute (as string)
        // Try to find actions for the given language code
        let apiActionsToDoList = this._automationModel.findData(query, language_code);

        // Fallback to default language if not found
        if (!apiActionsToDoList) {
            apiActionsToDoList = this._automationModel.findData(query, this._defaultLanguageCode);
        }

        // Fallback to '_action_not_found_' key if still not found
        if (!apiActionsToDoList) {
            apiActionsToDoList = this._automationModel.findData('_action_not_found_', language_code);
        }

        // Fallback to default language '_action_not_found_' if still not found
        if (!apiActionsToDoList) {
            apiActionsToDoList = this._automationModel.findData('_action_not_found_', this._defaultLanguageCode);
        }

        if (!apiActionsToDoList) {
            return [];
        }

        const actions = JSON.parse(apiActionsToDoList);
        return actions;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutomationHandler };
}