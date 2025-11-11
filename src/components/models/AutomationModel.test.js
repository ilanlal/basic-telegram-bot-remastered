require('../../../tests');
const { AutomationModel } = require('./AutomationModel');
const { Entity } = require('./Entity');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { SheetModel } = require('./SheetModel');
const { EMD } = require('../../config/EMD');

describe('AutomationModel', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        SheetModel.create(
            SpreadsheetApp.getActiveSpreadsheet()
        ).bindSheetSampleData(EMD.Automation.sheet({}));
    });

    it('should create an instance', () => {
        const model = AutomationModel.create();
        expect(model).toBeInstanceOf(AutomationModel);
    });

    describe('handleAutomation', () => {
        const model = AutomationModel.create();

        test('should find language column index', () => {
            const index = model.findLanguageColumnIndex('default');
            expect(index).toBe(1); // 'default' should be in the second column (index 1)
        });

        test('should set active sheet', () => {
            const activeSheet = model.setActiveSheet();
            expect(activeSheet.getName()).toBe(AutomationModel.REPLIES_SHEET_NAME);
        });

        test('should list all replies keys', () => {
            model.addDemoData();
            const replies = model.listRepliesKeys();
            expect(replies.length).toBeGreaterThan(2);
        });

        test('should list all languages', () => {
            const languages = model.listLanguages();
            expect(languages.length).toBeGreaterThan(0);
        });

        // getReplyByKey
        test('should get reply by key', () => {
            model.addDemoData();
            const reply = model.getReplyByKey('/start', 'default');
            expect(reply).toBeDefined();
            console.log(JSON.parse(reply, null, 2));
            //expect(JSON.parse(reply).method).toBeDefined();
            //expect(JSON.parse(reply).payload).toBeDefined();
        });

        test('should return null for non-existing key', () => {
            const reply = model.getReplyByKey('[NON_EXISTING_KEY]', 'default');
            expect(reply).toBeNull();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

});


