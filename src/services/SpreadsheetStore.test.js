require('@ilanlal/gasmocks');
const { SpreadsheetStore } = require('./SpreadsheetStore');

describe('SpreadsheetStore', () => {
    let store;

    beforeEach(() => {
        store = SpreadsheetStore.create(SpreadsheetApp.getActiveSpreadsheet());
    });

    test('should initialize with active spreadsheet', () => {
        expect(store.getActiveSpreadsheet()).toBe(Spreadsheet);
    });

    // getActiveSheet
    test('should return active sheet', () => {
        expect(store.getActiveSheet()).toBe(
            SpreadsheetApp.getActiveSpreadsheet().getActiveSheet());
    });

    // getSheetByName
    test('should return sheet by name', () => {
        const sheet = store.getSheetByName('Sheet2');
        expect(sheet).toBe(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet2'));
    });

    test('should throw error if no active spreadsheet provided', () => {
        expect(() => {
            SpreadsheetStore.create(null, 'Test Sheet');
        }).toThrow("No active spreadsheet provided");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
