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

SpreadsheetService.Events = {
    initialize: ({ activeSpreadsheet }) => {
        let sheet = activeSpreadsheet
            .getSheetByName(SpreadsheetService.EVENT_LOG_SHEET_NAME);
        if (!sheet) {
            sheet = activeSpreadsheet.insertSheet(SpreadsheetService.EVENT_LOG_SHEET_NAME);
            sheet.appendRow(['Created On', 'DC', 'Action', 'chat_id', 'content', 'event']);
        }
        return sheet;
    },
    logEvent: ({ dc, action, chat_id, content, event }) => {
        const sheet = SpreadsheetService.Events.initialize({
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const datestring = new Date().toISOString();
        sheet.appendRow([datestring, dc, action, chat_id, content, event]);
    }
}

SpreadsheetService.Users = {
    addUser: (chat_id, data) => {
        const sheet = SpreadsheetService.Users.getUsersSheet();
        const datestring = new Date().toISOString();

        const user = [datestring, chat_id, data.username, data.first_name, data.last_name, data.language_code, data];
        sheet.appendRow(user);

        return user;
    },
    getUserById: (id) => {
        const range = SpreadsheetService.Users.getUsersSheet().getRange('B:B');
        const textDinder = range.createTextFinder(id);
        const firstOccurrence = textFinder.findNext();
        if (firstOccurrence) {
            return firstOccurrence.getValues();
        }

        return null;
    },
    getUsersSheet: () => {
        let sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(SpreadsheetService.USERS_SHEET_NAME);

        if (!sheet) {
            // Create the sheet if it doesn't exist
            sheet = SpreadsheetApp
                .getActiveSpreadsheet()
                .insertSheet(this.USERS_SHEET_NAME);

            sheet.appendRow(EMD.Customer.sheet({}).columns);
        }

        return sheet;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpreadsheetService };
}