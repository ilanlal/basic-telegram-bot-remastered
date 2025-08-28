/** 
 * @see https://developers.google.com/apps-script/guides/triggers
 */

function onInstall(e) {
    onOpen(e);
}

function onOpen(e) {
    
}

/**
 * @see https://developers.google.com/apps-script/guides/web
 */
function doGet(e) {
    try {
        // Call the QUnit runner to execute tests
        const runner = new QUnitRunner(e);
        return runner.getHtml();
    } catch (error) {
        // Handle any errors that occur during the execution
        Logger.log("Error in doGet: " + error.message);
        // Return an error message to the user
        return HtmlService.createHtmlOutput("Error: " + error.message);
    }
}