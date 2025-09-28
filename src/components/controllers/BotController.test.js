/* eslint-disable no-undef */
require('../../types'); // Ensure the model is loaded
require('../views'); // Ensure the component is loaded
require("@ilanlal/gasmocks");
require('../../lib'); // Ensure the lib is loaded
require('../../services'); // Ensure the service is loaded
const { BotController } = require('./BotController');

describe('BotController Tests', () => {
    let controller;

    beforeEach(() => {
        controller = BotController.create(new UserStore());
    });

    test("BotController should be defined", () => {
        expect(BotController).toBeDefined();
    });

    test("BotController instance should be created", () => {
        expect(controller).toBeInstanceOf(BotController);
    });

    //registerBotToken
    test("registerBotToken should return a CardService.ActionResponse", () => {
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

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/setWebhook`)
            .return(new HttpResponse().setContentText(`{"ok":true,"result":{}}`));

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getWebhookInfo`)
            .return(new HttpResponse().setContentText(`{"ok":true,"result":{}}`));

        const actionResponse = controller.registerBotToken(token);
        expect(actionResponse).toBeDefined();
    });

    // saveBotSettings
    test("saveBotSettings should return a CardService.ActionResponse", () => {
        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['BOT_NAME']: {
                        stringInputs: {
                            value: ["TEST_BOT_NAME"]
                        }
                    }
                }
            }
        };

        const actionResponse = controller.saveBotSettings(mockEvent);
        expect(actionResponse).toBeDefined();

    });
});
