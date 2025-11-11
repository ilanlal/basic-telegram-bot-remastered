require('../../../tests');

const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { PostMessageHandler } = require('./PostMessageHandler');

describe('PostMessageHandler', () => {
    /** @type {PostMessageHandler} */
    let handler;

    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        handler = PostMessageHandler.create();
    });

    test('should handle verifyPerson call', () => {
        const content = {
            message: {
                chat: { id: 12345 },
                text: '/start',
                message_id: 1,
                entities: [{ type: 'bot_command', offset: 0, length: 6 }],
                from: { id: 12345, language_code: 'en', username: 'testuser', first_name: 'Test', last_name: 'User' }
            }
        };
        // first call to verifyPersone should add the user response is array of user data
        let response = handler.verifyPersone(content.message);
        expect(Array.isArray(response)).toBe(true);
        // check if user is added to Users sheet
        let user = SpreadsheetService.Users.getUserById(content.message.from.id);
        expect(user).not.toBeNull();
        expect(user[2]).toBe(content.message.from.username);
        expect(user[3]).toBe(content.message.from.first_name);
        expect(user[4]).toBe(content.message.from.last_name);
        expect(user[5]).toBe(content.message.from.language_code);

        // call again to verify no duplicate user is added
        response = handler.verifyPersone(content.message);
        expect(Array.isArray(response)).toBe(true);
        // check if only one user entry exists in Users sheet
        let usersSheet = SpreadsheetService.Users.getUsersSheet();
        let data = usersSheet.getDataRange().getValues();
        let userCount = data.filter(row => row[1] === content.message.from.id).length;
        expect(userCount).toBe(1);
    });

    describe('commands', () => {
        const commands = ['/start', '/whoami', '/me', '/whoru', '/whoareyou', '/botinfo', '/help', '/about'];
        commands.forEach(cmd => {
            test(`should handle ${cmd} command`, () => {
                const content = {
                    message: {
                        chat: { id: 12345 },
                        text: cmd,
                        message_id: 1,
                        entities: [{ type: 'bot_command', offset: 0, length: cmd.length }],
                        from: { id: 12345, language_code: 'en', username: 'testuser', first_name: 'Test', last_name: 'User' }
                    }
                };
                let response = handler.handlePostMessage(content);
                expect(response).toContain('dynamic_reply_handled');
            });
        });
    });


    test('should throw error for invalid message format', () => {
        const content = { invalid: 'data' };
        expect(() => handler.handlePostMessage(content)).toThrow('Invalid message format');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});