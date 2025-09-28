require('@ilanlal/gasmocks');
const { SpreadsheetService } = require('./SpreadsheetService');

describe('SpreadsheetService', () => {
    const ssService = SpreadsheetService.create(
        SpreadsheetApp.getActiveSpreadsheet());

    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    test('should initialize with active spreadsheet', () => {
        expect(ssService.getActiveSpreadsheet()).toBe(
            SpreadsheetApp.getActiveSpreadsheet());
    });

    // getActiveSheet
    test('should return active sheet', () => {
        expect(ssService.getActiveSheet()).toBe(
            SpreadsheetApp.getActiveSpreadsheet()
                .getActiveSheet());
    });

    // getSheetByName
    test('should return sheet by name', () => {
        ssService.getActiveSpreadsheet().insertSheet('Sheet2');
        const sheet = ssService.getSheetByName('Sheet2');
        expect(sheet).toBeDefined();
        expect(sheet).toBe(SpreadsheetApp
            .getActiveSpreadsheet()
            .getSheetByName('Sheet2'));
    });

    test('should throw error if no active spreadsheet provided', () => {
        expect(() => {
            SpreadsheetService.create(null, 'Test Sheet');
        }).toThrow("No active spreadsheet provided");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

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

        SpreadsheetService.Events.initialize({
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        SpreadsheetService.Events.log(mockEvent);
    });
});

describe('SpreadsheetService.Replies', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        SpreadsheetService.Replies.initialize({
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet(),
            language_code: 'en'
        });
    });

    test('should add demo data to replies sheet', () => {
        SpreadsheetService.Replies.addDemoData();
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(SpreadsheetService.REPLIES_SHEET_NAME);
        expect(sheet.getLastRow()).toBeGreaterThan(1); // Header + demo data
    });
});