// version: 1.2.0
class SpreadsheetStore {
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

        return new SpreadsheetStore(activeSpreadsheet)
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

SpreadsheetStore.Events ={
    log: ({ dc, action, chat_id, content, event }) => {
        const sheet = SpreadsheetStore.prototype.getSheetByName(SpreadsheetStore.EVENT_LOG_SHEET_NAME)
            || SpreadsheetStore.prototype.getEventLogSheet_();
        const datestring = new Date().toISOString();
        sheet.appendRow([datestring, dc, action, chat_id, content, event]);
    },
    initialize: (activeSpreadsheet) => {
        let sheet = activeSpreadsheet.getSheetByName(SpreadsheetStore.EVENT_LOG_SHEET_NAME);
        if (!sheet) {
            sheet = activeSpreadsheet.insertSheet(SpreadsheetStore.EVENT_LOG_SHEET_NAME, 0);
            sheet.appendRow(['Created On', 'DC', 'Action', 'chat_id', 'content', 'event']);
        }
    }
}

SpreadsheetStore.Replies = {
    BASE_REPLIES: () => [
        ['_notdefined', JSON.stringify({
            action: 'sendMessage',
            payload: {
                text: "Sorry, I didn't understand that. Please try again."
            }
        })],
        ['/start', JSON.stringify({
            action: 'sendMessage',
            payload: {
                text: "Welcome! How can I assist you today?",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Help", callback_data: "/help" }],
                        [{ text: "About", callback_data: "/about" }]
                    ]
                }
            }
        })],
        ['/help', JSON.stringify({
            action: 'sendMessage',
            payload: {
                text: "Here are some commands you can use:\n/start - Start the bot\n/help - Show this help message",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Home", callback_data: "/start" }]
                    ]
                }
            }
        })],
        ['/about', JSON.stringify({
            action: 'sendMessage',
            payload: {
                text: "This is a sample Telegram bot built with Google Apps Script.",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Home", callback_data: "/start" }]
                    ]
                }
            }
        })]
    ],
    initialize: (activeSpreadsheet, language_code) => {
        let sheet = activeSpreadsheet
            .getSheetByName(SpreadsheetStore.REPLIES_SHEET_NAME);

        if (!sheet) {
            sheet = activeSpreadsheet
                .insertSheet(SpreadsheetStore.REPLIES_SHEET_NAME);
            sheet.appendRow(['key', language_code]);
        }
    },
    findLanguageColumnIndex: (language_code) => {
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(SpreadsheetStore.REPLIES_SHEET_NAME);
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
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(SpreadsheetStore.REPLIES_SHEET_NAME);

        if (!sheet) {
            throw new Error("Replies sheet does not exist. Please initialize first.");
        }
        const baseReplies = SpreadsheetStore.Replies.BASE_REPLIES();
        baseReplies.forEach(row => sheet.appendRow(row));
    },
    getReplyByKey: (key, language_code) => {
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(SpreadsheetStore.REPLIES_SHEET_NAME);
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

SpreadsheetStore.Users = {
    addUser: (chat_id, data) => {
        const sheet = SpreadsheetStore.Users.getUsersSheet();
        const datestring = new Date().toISOString();

        const user = [datestring, chat_id, data.username, data.first_name, data.last_name, data.language_code, data];
        sheet.appendRow(user);

        return user;
    },
    getUserById: (id) => {
        const range = SpreadsheetStore.Users.getUsersSheet().getDataRange();
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
            .getSheetByName(SpreadsheetStore.USERS_SHEET_NAME);

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
    module.exports = { SpreadsheetStore };
}