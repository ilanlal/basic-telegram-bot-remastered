require('../../__mocks__');
const { EventHandlers } = require('./EventHandlers');
require('./controllers');
require('../services');
const { TelegramBotClient, TelegramBotClientFactory } = require('../libs');
require('./views');
require('./models');

describe('EventHandlers.Home Tests', () => {
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

        const actionResponse = EventHandlers.Home.openCreateNewBotCard(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    //openBotSettingsCard
    test('openBotSettingsCard should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const actionResponse = EventHandlers.Home.openBotSettingsCard(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    //openBotRepliesCard
    test('openBotRepliesCard should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const actionResponse = EventHandlers.Home.openBotRepliesCard(mockEvent);
        expect(actionResponse).toBeDefined();
    });
});

// EventHandlers.Bot Tests
describe('EventHandlers.Bot Tests', () => {
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

        const actionResponse = EventHandlers.Bot.saveNewBotToken(mockEvent);
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

        const actionResponse = EventHandlers.Bot.saveMyBotInfo(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    // setWebhook
    
});