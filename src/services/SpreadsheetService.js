// version: 1.2.0
class SpreadsheetService {
    static get EVENT_LOG_SHEET_NAME() {
        return "Event Logs";
    }

    static get USERS_SHEET_NAME() {
        return EMD.Customer.sheet({}).name;
    }

    static get REPLIES_SHEET_NAME() {
        return EMD.Automations.sheet({}).name;
    }

    getActiveSpreadsheet() {
        return this._activeSpreadsheet;
    }

    setActiveSheet(sheet) {
        this._activeSheet = sheet;
        return this;
    }

    getActiveSheet() {
        return this._activeSheet;
    }

    getSheetByName(name) {
        return this._activeSpreadsheet?.getSheetByName(name);
    }

    constructor(activeSpreadsheet = null) {
        this._activeSpreadsheet = activeSpreadsheet;
    }

    static create(activeSpreadsheet, sheetName = null) {
        if (!activeSpreadsheet) {
            throw new Error("No active spreadsheet provided");
        }
        const sheet = activeSpreadsheet.getSheetByName(sheetName)
            || activeSpreadsheet.getActiveSheet();

        return new SpreadsheetService(activeSpreadsheet)
            .setActiveSheet(sheet);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpreadsheetService };
}