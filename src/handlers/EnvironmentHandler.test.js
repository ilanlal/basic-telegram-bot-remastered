require('../../tests');
const { EnvironmentHandler } = require('./EnvironmentHandler');

describe('EnvironmentHandler', () => {
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    it('should create an instance of EnvironmentHandler', () => {
        const handler = new EnvironmentHandler();
        expect(handler).toBeInstanceOf(EnvironmentHandler);
    });

    it('should handle onIdentifyTokenClick', () => {
        const token = 'tcp://token[FAKE_DUMMY_BOT_TOKEN]&#39;;>@&-_][+0!]';
        const contentText = `{
            "result": {
                "id": 1234567809,
                "is_bot": true,
                "first_name": "TestBot",
                "username": "TestBotUsername"
            }
        }`;

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getMe`)
            .return(new HttpResponse().setContentText(contentText));

        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['txt_bot_api_token']: {
                        stringInputs: {
                            value: [token]
                        }
                    }
                }
            }
        };
        const actionResponse = EnvironmentHandler.Addon.onIdentifyTokenClick(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toBe('👍 Bot token identified successfully.');
    });

    // handleSaveAdminChatId
    it('should handle onSaveAdminChatIdClick', () => {
        const adminChatId = '1234567890';

        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['txt_admin_chat_id']: {
                        stringInputs: {
                            value: [adminChatId]
                        }
                    }
                }
            }
        };
        const actionResponse = EnvironmentHandler.Addon.onSaveAdminChatIdClick(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toBe('👍 Admin Chat ID saved successfully.');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});