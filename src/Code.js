/** 
 * @see https://developers.google.com/apps-script/guides/triggers
 */

function onInstall(e) {
    onOpen(e);
}

function onOpen(e) {

}

function doGet(e) {
    return JSON.stringify({ status: 'ok' });
}

function doPost(e) {
    try {
        const contents = JSON.parse(e.postData.contents);
        const isDebug = PropertiesService.getUserProperties()
            .getProperty(EnvironmentModel.InputMeta.DEBUG_MODE) === 'true';
        if (isDebug) {
            console.log('Received POST contents:', JSON.stringify(contents, null, 2));
        }
        // Handle the webhook event
        return WebhookHandler.handlePostUpdateRequest(contents, isDebug);
    } catch (error) {
        throw error;
    }
}

// Export the functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        onInstall,
        onOpen,
        doGet,
        doPost
    };
}