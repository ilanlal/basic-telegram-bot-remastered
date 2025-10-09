require('@ilanlal/gasmocks');
require('.');
const { RepliesSheetService } = require('./RepliesSheetService');
const { Resources } = require('../Resources');

const language_code = 'en';
const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
global.Resources = Resources;

describe('RepliesSheetService', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    test('should initialize Replies sheet with default language', () => {
        const service = RepliesSheetService.create(activeSpreadsheet, language_code);
        expect(service).toBeDefined();
    });

    test('should add demo data to Replies sheet', () => {
        const service = RepliesSheetService.create(activeSpreadsheet, language_code);
        service.addDemoData();
        const sheet = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(RepliesSheetService.REPLIES_SHEET_NAME);
        expect(sheet.getLastRow()).toBeGreaterThan(3); // Header + demo data
    });

    test('should find language column index', () => {
        const service = RepliesSheetService.create(activeSpreadsheet, language_code);
        const index = service.findLanguageColumnIndex('en');
        expect(index).toBe(1); // 'en' should be in the second column (index 1)
    });

    test('should set active sheet', () => {
        const service = RepliesSheetService.create(activeSpreadsheet, language_code);
        const activeSheet = service.setActiveSheet();
        expect(activeSheet.getName()).toBe(RepliesSheetService.REPLIES_SHEET_NAME);
    });

    test('should list all replies keys', () => {
        const service = RepliesSheetService.create(activeSpreadsheet, language_code);
        service.addDemoData();
        const replies = service.listRepliesKeys();
        expect(replies.length).toBeGreaterThan(2);
    });

    test('should list all languages', () => {
        const service = RepliesSheetService.create(activeSpreadsheet, language_code);
        const languages = service.listLanguages();
        expect(languages.length).toBeGreaterThan(0);
    });

    // getReplyByKey
    test('should get reply by key', () => {
        const service = RepliesSheetService.create(activeSpreadsheet, language_code);
        service.addDemoData();
        const reply = service.getReplyByKey('/start', language_code);
        expect(reply).toBeDefined();
        expect(JSON.parse(reply).method).toBeDefined();
        expect(JSON.parse(reply).payload).toBeDefined();
    });

    test('should return null for non-existing key', () => {
        const service = RepliesSheetService.create(activeSpreadsheet, language_code);
        const reply = service.getReplyByKey('[NON_EXISTING_KEY]', language_code);
        expect(reply).toBeNull();
    });
});