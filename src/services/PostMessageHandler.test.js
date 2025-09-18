const { PostMessageHandler } = require('./PostMessageHandler');

describe('PostMessageHandler', () => {
    let handler;

    beforeEach(() => {
        handler = new PostMessageHandler();
    });

    test("PostMessageHandler should be defined", () => {
        expect(PostMessageHandler).toBeDefined();
    });
});