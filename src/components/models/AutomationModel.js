class AutomationModel {
    static get REPLIES_SHEET_NAME() {
        return EMD.Automation.sheet({}).name;
    }

    get languageCode() {
        return this.language_code;
    }

    constructor(activeSpreadsheet) {
        this.language_code = 'default';
        this.activeSpreadsheet = activeSpreadsheet;
        this.sheet = this.initialize();
    }

    static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new AutomationModel(activeSpreadsheet);
    }

    initialize() {
        this.sheet = this.activeSpreadsheet
            .getSheetByName(AutomationModel.REPLIES_SHEET_NAME);
        if (!this.sheet) {
            this.sheet = this.activeSpreadsheet
                .insertSheet(AutomationModel.REPLIES_SHEET_NAME);
            this.sheet
                .appendRow(EMD.Automation.sheet({}).columns);
        }
        return this.sheet;
    }

    setActiveSheet() {
        if (!this.sheet) {
            throw new Error(`${AutomationModel.REPLIES_SHEET_NAME} sheet not found. Please initialize first.`);
        }

        return this.activeSpreadsheet.setActiveSheet(this.sheet);
    }

    findLanguageColumnIndex(language_code) {
        const range = this.sheet.getDataRange();
        const values = range.getValues();

        for (let col = 0; col < values[0].length; col++) {
            if (values[0][col] === language_code) {
                return col;
            }
        }
        return 1; // default to second column
    }

    listRepliesKeys() {
        const range = this.sheet.getDataRange();
        const values = range.getValues();
        const keys = [];
        for (let row = 1; row < values.length; row++) { // Skip header row
            const key = values[row][0];
            if (key && key.trim() !== '') {
                keys.push({ key, row });
            }
        }
        return keys;
    }

    listLanguages() {
        const range = this.sheet.getDataRange();
        const values = range.getValues();
        const languages = [];
        for (let col = 1; col < values[0].length; col++) { // Skip key column
            const lang = values[0][col];
            if (lang && lang.trim() !== '') {
                languages.push({
                    lang, col
                });
            }
        }
        return languages;
    }

    getReplyByKey(key, language_code) {
        const range = this.sheet.getDataRange();
        const values = range.getValues();
        let langColIndex = this.findLanguageColumnIndex(language_code);

        if (langColIndex === -1) {
            // throw new Error(`Language code "${language_code}" not found in Replies sheet.`);
            langColIndex = 1; // Default to second column if language not found
        }
        for (let row = 1; row < values.length; row++) { // Skip header row
            if (values[row][0] === key) {
                return values[row][langColIndex];
            }
        }
        return null;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AutomationModel
    };
}