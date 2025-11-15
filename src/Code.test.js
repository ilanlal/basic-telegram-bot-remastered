require('../tests');
const { doGet, doPost } = require('./Code');

describe('doGet', () => {
    it('should run doGet message handler', () => {
        const event = {}; // Mock event object
        const response = doGet(event);
        expect(response).toBeDefined();
    });
});

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
                        text: '/home'
                    }
                })
            }
        };
        const dummyToken = 'DUMMY_BOT_TOKEN';

        // Set dummy bot token in user properties
        PropertiesService.getUserProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
        const response = doPost(event);
        expect(response).toBeDefined();
    });
});