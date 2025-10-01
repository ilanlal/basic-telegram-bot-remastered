// version: 1.2.0
class SpreadsheetService {
    static get EVENT_LOG_SHEET_NAME() {
        return "Event Logs";
    }

    static get USERS_SHEET_NAME() {
        return "Users";
    }

    static get REPLIES_SHEET_NAME() {
        return "Replies";
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

    writeEvent({ dc, action, chat_id, content, event }) {
        const sheet = this.getSheetByName(this.EVENT_LOG_SHEET_NAME);
        const datestring = new Date().toISOString();
        sheet.appendRow([datestring, dc, action, chat_id, content, event]);
    }

    writeError({ dc, action, chat_id, content, event }) {
        const sheet = this.getSheetByName(this.EVENT_LOG_SHEET_NAME);
        const datestring = new Date().toISOString();
        sheet.appendRow([datestring, dc, action, chat_id, content, event]);
    }

    getEventLogSheet_() {
        const monthAsNumber = new Date().getMonth() + 1;
        return SpreadsheetApp
            .getActiveSpreadsheet()
            .getSheetByName(this.EVENT_LOG_SHEET_NAME + ' ' + monthAsNumber)
            ?? SpreadsheetApp
                .getActiveSpreadsheet()
                .insertSheet(this.EVENT_LOG_SHEET_NAME + ' ' + monthAsNumber, 0)
                .appendRow(['Created On', 'DC', 'Action', 'chat_id', 'content', 'event']);
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

SpreadsheetService.Replies = {
    initialize: ({ activeSpreadsheet, language_code }) => {
        let sheet = activeSpreadsheet
            .getSheetByName(SpreadsheetService.REPLIES_SHEET_NAME);

        if (!sheet) {
            sheet = activeSpreadsheet
                .insertSheet(SpreadsheetService.REPLIES_SHEET_NAME);
            sheet.appendRow(['key', language_code]);
        }
        else {
            const index = SpreadsheetService.Replies
                .findLanguageColumnIndex(language_code);
            if (index === -1) {
                const lastCol = sheet.getLastColumn();
                sheet.getRange(1, lastCol + 1).setValue(language_code);
            }
        }
        return sheet;
    },
    findLanguageColumnIndex: (language_code) => {
        const sheet = SpreadsheetService.Replies.initialize({
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet(),
            language_code: language_code
        });
        const range = sheet.getDataRange();
        const values = range.getValues();

        for (let col = 0; col < values[0].length; col++) {
            if (values[0][col] === language_code) {
                return col;
            }
        }
        return 1; // default to second column
    },
    addDemoData: () => {
        const sheet = SpreadsheetService.Replies.initialize({
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });

        if (!sheet) {
            throw new Error("Replies sheet does not exist. Please initialize first.");
        }
        
        Resources.Samples.en.actions.forEach(row => sheet.appendRow(row));
    },
    getReplyByKey: (key, language_code) => {
        const sheet = SpreadsheetService.Replies.initialize({
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet(),
            language_code: language_code
        });
        
        const range = sheet.getDataRange();
        const values = range.getValues();

        for (let row = 1; row < values.length; row++) {
            if (values[row][0] === key) {
                return JSON.parse(values[row][1])[language_code];
            }
        }
        return null;
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
        const range = SpreadsheetService.Users.getUsersSheet().getDataRange();
        const values = range.getValues();
        for (var row = 0; row < values.length; row++) {
            if (values[row][1] == id) { //chat_id
                return values[row]; //user row
            }
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

            sheet.appendRow(['Created on', 'chat_id', 'username', 'First Name', 'Last Name', 'language_code', 'Data']);
        }

        return sheet;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SpreadsheetService };
}