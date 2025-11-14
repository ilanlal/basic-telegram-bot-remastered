require('../../tests');
const { SpreadsheetService } = require('./SpreadsheetService');

describe('SpreadsheetService.Events', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    test('should log event to event log sheet', () => {
        const mockEvent = {
            dc: 'TestDC',
            action: 'TestAction',
            chat_id: 'TestChatID',
            content: 'TestContent',
            event: 'TestEvent'
        };
        SpreadsheetService.Events.logEvent(mockEvent);
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(SpreadsheetService.EVENT_LOG_SHEET_NAME);
        expect(sheet.getLastRow()).toBe(2);
    });
});