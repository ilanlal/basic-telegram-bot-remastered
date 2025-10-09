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
        expect(sheet.getLastRow()).toBeGreaterThan(3); // Header + demo data
    });

    test('should list all replies', () => {
        const language_code = 'en';
        SpreadsheetService.Replies.addDemoData();
        const replies = SpreadsheetService.Replies.listRepliesKeys();
        expect(replies.length).toBeGreaterThan(0);
    });

    test('should get reply by key', () => {
        const language_code = 'en';
        SpreadsheetService.Replies.addDemoData();
        const reply = SpreadsheetService.Replies.getReplyByKey('/start', language_code);
        expect(reply).toBeDefined();
        expect(reply.payload).toBeDefined();
    });
});