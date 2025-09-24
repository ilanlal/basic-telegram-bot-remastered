class WebhookHandler {
    static handlePost(contents) {
        try {
            if (contents.callback_query) {
                const postCallbackQueryHandler = new PostCallbackQueryHandler();
                return postCallbackQueryHandler.handlePostCallbackQuery(contents);
            } else if (contents.message) {
                const postMessageHandler = new PostMessageHandler();
                return postMessageHandler.handlePostMessage(contents);
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