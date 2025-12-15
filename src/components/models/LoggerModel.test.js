require('../../../tests');
const { AutomationModel } = require('./AutomationModel');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { SheetModel } = require('./SheetModel');
const { EMD } = require('../../config/EMD');
const { LoggerModel } = require('./LoggerModel');
const { EnvironmentModel } = require('./EnvironmentModel');

describe('LoggerModel', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    it('should create an instance', () => {
        const model = LoggerModel.create();
        expect(model).toBeInstanceOf(LoggerModel);
    });

    test('should log event to event log sheet', () => {
            const mockEvent = {
                dc: 'TestDC',
                action: 'TestAction',
                chat_id: 'TestChatID',
                content: 'TestContent',
                event: 'TestEvent'
            };
            EnvironmentModel.create().setDebugMode('all');
            LoggerModel.create().logEvent(mockEvent);
            const sheet = SpreadsheetApp.getActiveSpreadsheet()
                .getSheetByName(EMD.Spreadsheet.Logger({}).name);
            expect(sheet.getLastRow()).toBe(2);
        });

    afterEach(() => {
        jest.clearAllMocks();
    });
});