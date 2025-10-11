require("@ilanlal/gasmocks");
require('../types');
require("../lib");
require('../services');
require('../components/controllers');
require('../components/views');
require('../components/models');
const { UiEventHandlers } = require('./UiEventHandlers');
const { Resources } = require('../Resources');

global.Resources = Resources;

describe('UiEventHandlers.Home Tests', () => {
    test('openAutomationRepliesCard should return a CardService.ActionResponse', () => {
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

    //openAutomationRepliesCard
    test('openAutomationRepliesCard should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const actionResponse = UiEventHandlers.Home.openAutomationRepliesCard(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    // openBotSetupCard
    test('openBotSetupCard should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const actionResponse = UiEventHandlers.Home.openBotSetupCard(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        expect(data.cardNavigations).toBeDefined();
    });
});

// UiEventHandlers.Bot Tests
describe('UiEventHandlers.Bot Tests', () => {

    // onSaveBotSetupSettingsClick
    test('onSaveBotSetupSettingsClick should return a CardService.ActionResponse', () => {
        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['DEFAULT_LANGUAGE']: {
                        stringInputs: {
                            value: ["es"]
                        }
                    },
                    ['DEPLOYMENT_ID']: {
                        stringInputs: {
                            value: ["test-deployment-id"]
                        }
                    },
                    ['MY_CHAT_ID']: {
                        stringInputs: {
                            value: ["123456789"]
                        }
                    }
                }
            }
        };
        const actionResponse = UiEventHandlers.Bot.onSaveBotSetupSettingsClick(mockEvent);
        expect(actionResponse).toBeDefined();
    });


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
    test('setWebhook should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const token = '[DUMMY_BOT_TOKEN]';
        const deploymentId = 'test-deployment-id';
        UserStoreFactory.create().current.setBotToken(token);
        UserStoreFactory.create().current.setDeploymentId(deploymentId);

        const webAppUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
        const callbackUrl = `https://api.telegram.org/bot${token}/setWebhook?url=${webAppUrl}`;

        UrlFetchAppStubConfiguration.when(callbackUrl)
            .return(new HttpResponse()
                .setContentText(`{"ok":true,"result":{}}`));
        const actionResponse = UiEventHandlers.Bot.setWebhook(mockEvent);
        expect(actionResponse).toBeDefined();
    });

    // deleteWebhook
    test('deleteWebhook should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const token = '[DUMMY_BOT_TOKEN]';
        const deploymentId = 'test_deployment_id';
        UserStoreFactory.create().current.setBotToken(token);
        UserStoreFactory.create().current.setDeploymentId(deploymentId);

        const webAppUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
        UrlFetchAppStubConfiguration
            .when(`https://api.telegram.org/bot${token}/deleteWebhook?url=${webAppUrl}`)
            .return(new HttpResponse()
                .setContentText(`{"ok":true,"result":{}}`));

        const actionResponse = UiEventHandlers.Bot.deleteWebhook(mockEvent);
        expect(actionResponse).toBeDefined();
    });
});

describe('UiEventHandlers.AutomationReply Tests', () => {
    // onAddAutomation
    test('onAddAutomationClick should return a CardService.ActionResponse', () => {
        const mockEvent = {};
        const actionResponse = UiEventHandlers.AutomationReplies.onAddAutomationClick(mockEvent);
        expect(actionResponse).toBeDefined();
    });
});