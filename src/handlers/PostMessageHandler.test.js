require('@ilanlal/gasmocks');
require('../services');

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
                from: { id: 12345, language_code: 'en', username: 'testuser', first_name: 'Test', last_name: 'User' }
            }
        };
        let response = handler.handlePostMessage(content);
        // check if user is added to Users sheet
        let user = SpreadsheetService.Users.getUserById(content.message.from.id);
        expect(user).not.toBeNull();
        expect(user[2]).toBe(content.message.from.username);
        expect(user[3]).toBe(content.message.from.first_name);
        expect(user[4]).toBe(content.message.from.last_name);
        expect(user[5]).toBe(content.message.from.language_code);
        expect(response).toContain('dynamic_reply_handled');

        // call again to verify no duplicate user is added
        response = handler.handlePostMessage(content);
        let usersSheet = SpreadsheetService.Users.getUsersSheet();
        let data = usersSheet.getDataRange().getValues();
        let userCount = data.filter(row => row[1] === content.message.from.id).length;
        expect(userCount).toBe(1);
        expect(response).toContain('dynamic_reply_handled');
        
        // check response content
        expect(response).toContain('/start');
        expect(response).toContain('_notdefined');
    });

    test('should throw error for invalid message format', () => {
        const content = { invalid: 'data' };
        expect(() => handler.handlePostMessage(content)).toThrow('Invalid message format');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});