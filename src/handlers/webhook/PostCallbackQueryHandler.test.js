require('../../../tests')
const { PostCallbackQueryHandler } = require('./PostCallbackQueryHandler');

describe('PostCallbackQueryHandler', () => {
    /** @type {PostCallbackQueryHandler} */
    let handler;
    const dummyToken = 'DUMMY_BOT_TOKEN';

    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        // Set dummy bot token in user properties
        PropertiesService.getDocumentProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
        handler = PostCallbackQueryHandler.create();
        SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
            .bindSheetSampleData(EMD.Automation.sheet({}));

    });

    test("PostCallbackQueryHandler should be defined", () => {
        expect(PostCallbackQueryHandler).toBeDefined();
    });

    test('should handle valid callback_query', () => {
        const content = {
            callback_query: {
                from: {
                    id: 123,
                    language_code: 'en'
                },
                data: '/home',
                message: {
                    message_id: 456
                }
            }
        };

        const response = handler.handlePostCallbackQuery(content);
        expect(response).toBeDefined();
    });

    it('should throw error for invalid callback_query format', () => {
        const content = { callback_query: {} };
        expect(() => PostCallbackQueryHandler.create().handlePostCallbackQuery(content)).toThrow('Invalid callback_query format');
    });

});