require('@ilanlal/gasmocks');
const { WebhookHandler } = require('./WebhookHandler');
require('.');

describe('WebhookHandler', () => {
    it('should run doPost message handler', () => {
        const event = {
            postData: {
                contents: JSON.stringify({
                    message: {
                        from: {
                            id: 123456,
                            language_code: 'en'
                        },
                        text: 'Hello, world!'
                    }
                })
            }
        };

        const handler = new WebhookHandler();
        const response = handler.handlePost(event);
        expect(response).toBeDefined();
    });

    it('should run doPost callback_query handler', () => {
        const event = {
            postData: {
                contents: JSON.stringify({
                    inline_query: {
                        from: {
                            id: 123456,
                            language_code: 'en'
                        },
                        query: 'inline_query'
                    }
                })
            }
        };

        const handler = new WebhookHandler();
        const response = handler.handlePost(event);
        expect(response).toBeDefined();
    });

    it('should return not_handled for invalid event', () => {
        const content = {};
        const handler = new WebhookHandler();
        const response = handler.handlePost(content);
        expect(response).toBe(JSON.stringify({ status: 'not_handled' }));
    });

    it('should throw error for invalid message format', () => {
        const content = { message: {} };
        const handler = new WebhookHandler();
        expect(() => handler.handlePost(content)).toThrow('Invalid message format');
    });

    it('should throw error for invalid callback_query format', () => {
        const content = { callback_query: {} };
        const handler = new WebhookHandler();
        expect(() => handler.handlePost(content)).toThrow('Invalid callback_query format');
    });

});