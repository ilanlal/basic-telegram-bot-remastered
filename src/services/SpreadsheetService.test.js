require('@ilanlal/gasmocks');
const { SpreadsheetService } = require('./SpreadsheetService');

describe('SpreadsheetService', () => {
    let store;

    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        store = SpreadsheetService.create(
            SpreadsheetApp.getActiveSpreadsheet());
    });

    test('should initialize with active spreadsheet', () => {
        expect(store.getActiveSpreadsheet()).toBe(
            SpreadsheetApp.getActiveSpreadsheet());
    });

    // getActiveSheet
    test('should return active sheet', () => {
        expect(store.getActiveSheet()).toBe(
            SpreadsheetApp.getActiveSpreadsheet()
            .getActiveSheet());
    });

    // getSheetByName
    test('should return sheet by name', () => {
        const sheet = store.getSheetByName('Sheet2');
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
