require('../tests');
const { doGet, doPost, scaffold_documentProperties, scaffold_scriptProperties } = require('./Code');

describe('doGet', () => {
    it('should run doGet message handler', () => {
        const event = {}; // Mock event object
        const response = doGet(event);
        expect(response).toBeDefined();
    });
});

describe('doPost', () => {
    const dummyToken = 'DUMMY_BOT_TOKEN';

    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
        PropertiesService.getDocumentProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
    });

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
        
        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${dummyToken}/sendMessage`)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    result: {
                        message_id: 1,
                    }
                })));

        // Set dummy bot token in user properties
        PropertiesService.getDocumentProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
        const response = doPost(event);
        expect(response).toBeDefined();
    });
});

describe('scaffold functions', () => {
    it('should scaffold script properties without errors', () => {
        expect(() => {
            scaffold_scriptProperties();
        }).not.toThrow();
    });

    it('should scaffold document properties without errors', () => {
        expect(() => {
            scaffold_documentProperties();
        }).not.toThrow();
    });
});