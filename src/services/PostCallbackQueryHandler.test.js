const { PostCallbackQueryHandler } = require('./PostCallbackQueryHandler');

describe('PostCallbackQueryHandler', () => {
    let handler;

    beforeEach(() => {
        handler = new PostCallbackQueryHandler();
    });

    test("PostCallbackQueryHandler should be defined", () => {
        expect(PostCallbackQueryHandler).toBeDefined();
    });
});