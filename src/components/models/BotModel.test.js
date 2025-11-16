require('../../../tests');
const { BotModel } = require('./BotModel');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { SheetModel } = require('./SheetModel');
const { EMD } = require('../../config/EMD');

describe('BotModel', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
            .bindSheetSampleData(EMD.BotSetup.sheet({}));
    });

    it('should create an instance', () => {
        const model = BotModel.create();
        expect(model).toBeInstanceOf(BotModel);
    });

    describe('model methods', () => {
        const model = BotModel.create();

        test('should find language column index', () => {
            const index = model.findLanguageColumnIndex('default');
            expect(index).toBe(1); // 'default' should be in the second column (index 1)
        });

        test('should list all keys', () => {
            const keys = model.getKeys();
            expect(keys.length).toBeGreaterThan(2);
        });

        test('should list all languages', () => {
            const languages = model.getLanguages();
            expect(languages.length).toBeGreaterThan(6);
        });

        test('should find value by key', () => {
            // reply is array of actions like {method: 'sendMessage', payload: {...}}
            const text = model.getValue('name', 'default');
            expect(text).toBe(EMD.BotSetup.sheet({}).sample_data[0][1]);
        });

        test('should return null for non-existing key', () => {
            const reply = model.getValue('[NON_EXISTING_KEY]', 'default');
            expect(reply).toBeNull();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

});


