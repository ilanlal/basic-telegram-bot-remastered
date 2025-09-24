require("@ilanlal/gasmocks");
require("../lib");
const { UiEventHandlers } = require('./UiEventHandlers');
require('../components/controllers');
require('../services');
require('../components/views');
require('../components/models');

describe('UiEventHandlers.Home Tests', () => {
    test('openCreateNewBotCard should return a CardService.ActionResponse', () => {
        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['BOT_TOKEN']: {
                        stringInputs: {
                            value: ["TEST_BOT_TOKEN"]
                        }
                    }
                }
            }
        };

        const actionResponse = UiEventHandlers.Home.openCreateNewBotCard(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    //openBotSettingsCard
    test('openBotSettingsCard should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const actionResponse = UiEventHandlers.Home.openBotSettingsCard(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    //openBotRepliesCard
    test('openBotRepliesCard should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const actionResponse = UiEventHandlers.Home.openBotRepliesCard(mockEvent);
        expect(actionResponse).toBeDefined();
    });
});

// UiEventHandlers.Bot Tests
describe('UiEventHandlers.Bot Tests', () => {
    // saveNewBotToken
    test('saveNewBotToken should return a CardService.ActionResponse', () => {
        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['BOT_TOKEN']: {
                        stringInputs: {
                            value: ["[DUMMY_BOT_TOKEN]"]
                        }
                    }
                }
            }
        };
        const contentText = {
            "result": {
                "id": 123456789,
                "is_bot": true,
                "first_name": "Test",
                "last_name": "User",
                "username": "testuser",
                "language_code": "en"
            }
        };

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot[DUMMY_BOT_TOKEN]/getMe`)
            .return(new HttpResponse().setContentText(JSON.stringify(contentText)));


            UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot[DUMMY_BOT_TOKEN]/setWebhook`)    
                .return(new HttpResponse().setContentText(`{"ok":true,"result":{}}`));

                UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot[DUMMY_BOT_TOKEN]/getWebhookInfo`)    
                    .return(new HttpResponse().setContentText(`{"ok":true,"result":{}}`));
        const actionResponse = UiEventHandlers.Bot.saveNewBotToken(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    //saveMyBotInfo
    test('saveMyBotInfo should return a CardService.ActionResponse', () => {
        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['BOT_INFO']: {
                        stringInputs: {
                            value: ["[DUMMY_BOT_INFO]"]
                        }
                    }
                }
            }
        };
        const contentText = {
            "result": {
                "id": 123456789,
                "is_bot": true,
                "first_name": "Test",
                "last_name": "User",
                "username": "testuser",
                "language_code": "en"
            }
        };

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot[DUMMY_BOT_INFO]/getMe`)
            .return(new HttpResponse().setContentText(JSON.stringify(contentText)));

        const actionResponse = UiEventHandlers.Bot.saveMyBotInfo(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    // setWebhook
    
});