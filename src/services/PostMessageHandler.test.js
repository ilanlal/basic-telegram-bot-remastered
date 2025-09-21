require('@ilanlal/gasmocks');
require('.');
const { PostMessageHandler } = require('./PostMessageHandler');

describe('PostMessageHandler', () => {
    let handler;

    beforeEach(() => {
        handler = PostMessageHandler.create();
    });

    test('should handle /start command', () => {
        const content = {
            message: {
                chat: { id: 12345 },
                text: '/start',
                message_id: 1,
                entities: [{ type: 'bot_command', offset: 0, length: 6 }],
                from: { id: 12345, language_code: 'en' }
            }
        };
        const response = handler.handlePostMessage(content);
        expect(response).toContain('dynamic_reply_handled');
    });
});