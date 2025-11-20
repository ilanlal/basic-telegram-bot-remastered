class LoggerModel {
    static create(userProperties = PropertiesService.getScriptProperties(), activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new LoggerModel(userProperties, activeSpreadsheet);
    }

    constructor(userProperties, activeSpreadsheet) {
        this.isDebug = userProperties
            .getProperty(EnvironmentModel.InputMeta.DEBUG_MODE) === 'true';
        this.sheetModel = SheetModel.create(activeSpreadsheet);
        this.sheet = this.sheetModel.initializeSheet(EMD.Logger.sheet({}));
    }

    logEvent({ dc, action, chat_id, content, event }) {
        if (!this.isDebug) {
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