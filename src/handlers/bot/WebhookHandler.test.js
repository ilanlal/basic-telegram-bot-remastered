require('@ilanlal/gasmocks');
require('../../services');
require('..');
require('..');
const { WebhookHandler } = require('./WebhookHandler');

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

        const response = WebhookHandler.handlePostUpdateRequest(event);
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

        const response = WebhookHandler.handlePostUpdateRequest(event);
        expect(response).toBeDefined();
    });

    it('should return not_handled for invalid event', () => {
        const content = {};
        const response = WebhookHandler.handlePostUpdateRequest(content);
        expect(response).toBe(JSON.stringify({ status: 'not_handled' }));
    });

    it('should throw error for invalid message format', () => {
        const content = { message: {} };
        expect(() => WebhookHandler.handlePostUpdateRequest(content)).toThrow('Invalid message format');
    });

    it('should throw error for invalid callback_query format', () => {
        const content = { callback_query: {} };
        expect(() => WebhookHandler.handlePostUpdateRequest(content)).toThrow('Invalid callback_query format');
    });

});