require('@ilanlal/gasmocks');
require('../../services');
const { PostCallbackQueryHandler } = require('./PostCallbackQueryHandler');

describe('PostCallbackQueryHandler', () => {
    let handler;

    beforeEach(() => {
        handler = PostCallbackQueryHandler.create();
    });

    test("PostCallbackQueryHandler should be defined", () => {
        expect(PostCallbackQueryHandler).toBeDefined();
    });
});