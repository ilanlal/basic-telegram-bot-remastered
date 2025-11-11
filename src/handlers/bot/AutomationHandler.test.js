require('../../../tests');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { AutomationHandler } = require('./AutomationHandler');

describe('AutomationHandler', () => {
    /** @type {AutomationHandler} */
    let handler;

    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        handler = AutomationHandler.create();
    });

    test('should handle automation request', () => {
        const content = {
            chat_id: 12345,
            name: 'test_automation'
        };
        let response = handler.handleAutomationRequest(content);
        expect(response).toContain('dynamic_reply_handled');
    });

    test('should throw error for invalid automation request', () => {
        const content = { invalid: 'data' };
        expect(() => handler.handleAutomationRequest(content)).toThrow('Invalid automation request format');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});