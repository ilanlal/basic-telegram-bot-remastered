class AutomationReply {
    get spreadsheetService() {
        if (!this._spreadsheetService) {
            this._spreadsheetService = SpreadsheetService.create(
                SpreadsheetApp.getActiveSpreadsheet());
        }
        return this._spreadsheetService;
    }
    constructor() {
        this._spreadsheetService = null;
    }

    static create() {
        return new AutomationReply();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AutomationReply
    };
}