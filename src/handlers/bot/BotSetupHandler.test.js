require('../../../tests');
const { BotSetupHandler } = require('./BotSetupHandler');

describe('BotSetupHandler', () => {
    describe('saveNewBotSetupInfo', () => {
        it('should save new bot setup information successfully', () => {
            const token = '[DUMMY_BOT_TOKEN]';

            const contentText = `{
            "result": {
                "id": 123456789,
                "is_bot": true,
                "first_name": "Test",
                "last_name": "User",
                "username": "testuser",
                "language_code": "en"
            }
        }`;

            UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getMe`)
                .return(new HttpResponse().setContentText(contentText));
            UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getWebhookInfo`)
                .return(new HttpResponse().setContentText(`{"ok":true,"result":{}}`));

            const mockEvent = {
                commonEventObject: {
                    formInputs: {
                        'API_TOKEN': { stringInputs: { value: [token] } },
                        'DEFAULT_LANGUAGE': { stringInputs: { value: ['en'] } },
                        'DEPLOYMENT_ID': { stringInputs: { value: ['123'] } },
                        'MY_CHAT_ID': { stringInputs: { value: ['456'] } }
                    }
                }
            };
            const result = BotSetupHandler.saveNewBotSetupInfo(mockEvent);
            expect(result).toBeDefined();
        });

        it('should throw an error if form inputs are missing', () => {
            const mockEvent = {
                commonEventObject: {
                    // formInputs is missing
                }
            };
            expect(() => BotSetupHandler.saveNewBotSetupInfo(mockEvent))
                .toThrow("Form inputs are missing");
        });
    });
});
