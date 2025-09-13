/** 
 * @see https://developers.google.com/apps-script/guides/triggers
 */

function onInstall(e) {
    onOpen(e);
}

function onOpen(e) {
    
}

function doGet(e) {
    return ContentService.createTextOutput("Hello, world!");
}