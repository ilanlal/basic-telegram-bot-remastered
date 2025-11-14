class WebhookHandler {
    static handlePostUpdateRequest(contents, isDebug = false) {
        try {
            if (contents.callback_query) {
                return PostCallbackQueryHandler.create()
                    .handlePostCallbackQuery(contents);
            } else if (contents.message) {
                return PostMessageHandler.create()
                    .handlePostMessage(contents.message);
            }

            return JSON.stringify({ status: 'not_handled' });
        } catch (error) {
            throw error;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WebhookHandler
    };
}