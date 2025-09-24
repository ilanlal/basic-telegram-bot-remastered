class WebhookHandler {
    constructor() {
        this.contents = null;
    }

    handlePost(contents) {
        this.contents = contents;
        try {
            if (this.contents.callback_query) {
                const postCallbackQueryHandler = new PostCallbackQueryHandler();
                return postCallbackQueryHandler.handlePostCallbackQuery(contents);
            } else if (this.contents.message) {
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