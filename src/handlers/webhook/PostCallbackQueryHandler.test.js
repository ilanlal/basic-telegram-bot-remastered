require('../../../tests')
const { PostCallbackQueryHandler } = require('./PostCallbackQueryHandler');

describe('PostCallbackQueryHandler', () => {
    let handler;

    beforeEach(() => {
        handler = PostCallbackQueryHandler.create();
    });

    test("PostCallbackQueryHandler should be defined", () => {
        expect(PostCallbackQueryHandler).toBeDefined();
    });

    it('should throw error for invalid callback_query format', () => {
        const content = { callback_query: {} };
        expect(() => PostCallbackQueryHandler.create().handlePostCallbackQuery(content)).toThrow('Invalid callback_query format');
    });

});