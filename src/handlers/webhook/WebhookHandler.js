class WebhookHandler {
    static handlePostUpdateRequest(contents) {
        try {
            if (contents.callback_query) {
                LoggerModel.create(this._userProperties, this._activeSpreadsheet)
                    .logEvent({
                        dc: 'PostCallbackQueryHandler',
                        action: 'handlePostCallbackQuery',
                        chat_id: contents.callback_query.from.id || 'unknown',
                        content: JSON.stringify(contents),
                        event: 'received_callback_query'
                    });

                return PostCallbackQueryHandler.create()
                    .handlePostCallbackQuery(contents);
            } else if (contents.message) {
                LoggerModel.create(this._userProperties, this._activeSpreadsheet)
                    .logEvent({
                        dc: 'PostMessageHandler',
                        action: 'handlePostMessage',
                        chat_id: contents.message?.from?.id || 'unknown',
                        content: JSON.stringify(contents.message),
                        event: 'received_message'
                    });
                return PostMessageHandler.create()
                    .handlePostMessage(contents.message);
            }

            return JSON.stringify({ status: 'not_handled' });
        } catch (error) {
            throw error;
        }
    }

    static handleException(error) {
        console.error('Error handling webhook request:', error);
        return JSON.stringify({ status: 'error', message: error.message });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WebhookHandler
    };
}