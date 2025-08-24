// Google Apps Script code for Google Workspace Add-ons
if (typeof require !== 'undefined' && require) {
    Global_Resources = require('../resources/Global_Resources.js').Global_Resources;
}
class AppManager {
    /**
     * Initializes the AppManager with the provided context.
     * @returns {Global_Resources['en']} - The localization resources
     */
    static getLocalizationResources() {
        return Global_Resources["en"];
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppManager
    };
}