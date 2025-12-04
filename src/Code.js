/** 
 * @see https://developers.google.com/apps-script/guides/triggers
 */

const Logger = require("@ilanlal/gasmocks/src/base/classes/Logger");

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
        // Handle the webhook event
        return WebhookHandler.handlePostUpdateRequest(contents);
    } catch (error) {
        Logger.log('Error in doPost: ' + error.message);
        throw error;
    }
}

function scaffold_scriptProperties() {
    // Scaffold function for setting up initial configurations

    const props = EnvironmentModel.InputMeta;
    // Set default values for each property if not already set
    const scriptProperties = PropertiesService.getScriptProperties();

    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            const currentValue = scriptProperties.getProperty(props[key]);
            if (currentValue === null) {
                scriptProperties.setProperty(props[key], `[SET_${props[key]}_HERE]`);
            }
        }
    }
}

function scaffold_documentProperties() {
    // Scaffold function for copying initial configurations to document properties from script properties
    const props = EnvironmentModel.InputMeta;
    const documentProperties = PropertiesService.getDocumentProperties();
    const scriptProperties = PropertiesService.getScriptProperties();

    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            const currentValue = documentProperties.getProperty(props[key]);
            if (currentValue === null) {
                documentProperties.setProperty(props[key], scriptProperties.getProperty(props[key]) || `[SET_${props[key]}_HERE]`);
            }
        }
    }
}

// Export the functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        onInstall,
        onOpen,
        doGet,
        doPost,
        scaffold_scriptProperties,
        scaffold_documentProperties
    };
}