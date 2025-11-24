class LoggerModel {
    static create(userProperties = PropertiesService.getDocumentProperties(), activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new LoggerModel(userProperties, activeSpreadsheet);
    }

    constructor(userProperties, activeSpreadsheet) {
        this.debugMode = PropertiesService.getScriptProperties()
            .getProperty(EnvironmentModel.InputMeta.DEBUG_MODE);
        this.sheetModel = SheetModel.create(activeSpreadsheet);
        this.sheet = this.sheetModel.initializeSheet(EMD.Logger.sheet({}));
    }

    logEvent({ dc, action, chat_id, content, event }) {
        if (this.debugMode !== 'true' && this.debugMode !== 'all') {
            return;
        }
        const datestring = new Date().toISOString();
        this.sheet.appendRow([datestring, dc, action, chat_id, content, event]);
    }

    logError({ dc, action, chat_id, content, event }) {
        if (this.debugMode !== 'true' && this.debugMode !== 'all' && this.debugMode !== 'errors' && this.debugMode !== 'error') {
            return;
        }
        const datestring = new Date().toISOString();
        this.sheet.appendRow([datestring, dc, action, chat_id, content, event]);
    }

}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoggerModel
    };
}