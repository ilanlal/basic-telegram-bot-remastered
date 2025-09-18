function doPost(e) {
    const contents = JSON.parse(e.postData.contents);

    try {
        const webhookHandler = new WebhookHandler();
        return webhookHandler.handlePost(contents);
    } catch (error) {
        throw error;
    }

    return JSON.stringify({ status: 'not_handled' });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        doPost
    };
}