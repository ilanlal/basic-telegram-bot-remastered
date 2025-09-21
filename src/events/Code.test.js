require('@ilanlal/gasmocks');
require('../services');
const { doPost } = require('./Code');

describe('doPost', () => {
    it('should run doPost message handler', () => {
        const event = {
            postData: {
                contents: JSON.stringify({
                    message: {
                        entities: [],
                        from: { id: 123456, first_name: 'Test', is_bot: false },
                        chat: { id: 123456, type: 'private' },
                        date: Math.floor(Date.now() / 1000),
                        reply_to_message: null,
                        message_id: 1,
                        text: 'Hello'
                    }
                })
            }
        };
        const response = doPost(event);
        expect(response).toBeDefined();
    });
});