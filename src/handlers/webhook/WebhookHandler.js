class WebhookHandler {
    static handlePostUpdateRequest(contents) {
        const userProperties = PropertiesService.getScriptProperties();
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        try {
            if (contents.callback_query) {
                LoggerModel.create(userProperties, activeSpreadsheet)
                    .logEvent({
                        dc: 'callback_query',
                        action: contents.callback_query.data || '_no_data_',
                        chat_id: contents.callback_query.from.id || '0000',
                        content: JSON.stringify(contents),
                        event: 'received_callback_query'
                    });

                return PostCallbackQueryHandler.create(userProperties, activeSpreadsheet)
                    .handlePostCallbackQuery(contents);
            } else if (contents.message) {
                LoggerModel.create(userProperties, activeSpreadsheet)
                    .logEvent({
                        dc: 'message',
                        action: contents.message.text || '_no_text_',
                        chat_id: contents.message?.from?.id || '0000',
                        content: JSON.stringify(contents.message),
                        event: 'received_message'
                    });
                return PostMessageHandler.create(userProperties, activeSpreadsheet)
                    .handlePostMessage(contents.message);
            }

            return JSON.stringify({ status: 'not_handled' });
        } catch (error) {
            LoggerModel.create(userProperties, activeSpreadsheet)
                .logEvent({
                    dc: 'error',
                    action: error.message || '_no_message_',
                    chat_id: '0000',
                    content: JSON.stringify(error),
                    event: 'error_handling'
                });
            throw error;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WebhookHandler
    };
}