require('@ilanlal/gasmocks');
require('..');
const { Resources } = require('../../Resources');
const { SpreadsheetService } = require('../SpreadsheetService');

global.Resources = Resources;

describe('SpreadsheetService.Replies', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    test('should add demo data and find it in the sheet', () => {
        SpreadsheetService.Replies.addDemoData();
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(SpreadsheetService.REPLIES_SHEET_NAME);
        expect(sheet.getLastRow()).toBeGreaterThan(1); // Header + demo data

        // Check if demo data exists
        const demoData = Resources.Samples.en.actions;
        demoData.forEach(row => {
            const found = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
                .getValues()
                .some(r => JSON.stringify(r) === JSON.stringify(row));
            expect(found).toBe(true);
        });
    });
});