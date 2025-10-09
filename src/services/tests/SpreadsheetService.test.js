require('@ilanlal/gasmocks');
require('..');
const { Resources } = require('../../Resources');
const { SpreadsheetService } = require('../SpreadsheetService');

global.Resources = Resources;

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
