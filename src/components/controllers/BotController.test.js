/* eslint-disable no-undef */
require('../models'); // Ensure the model is loaded
require('../views'); // Ensure the component is loaded
require('../../tests'); // index.js
require('../../libs'); // Ensure the lib is loaded
require('../../services'); // Ensure the service is loaded
const { BotController, BotControllerFactory } = require('./BotController');

describe('BotController Tests', () => {
    let controller;

    beforeEach(() => {
        controller =
            BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory()
                        .build())
                .withTelegramBotClient(
                    global.TelegramBotClientFactory
                        .withToken("YOUR_BOT_TOKEN")
                        .create())
                .build();
    });

    test("BotController should be defined", () => {
        expect(BotController).toBeDefined();
    });

    test("BotControllerFactory should be defined", () => {
        expect(BotControllerFactory).toBeDefined();
    });

    test("BotController instance should be created", () => {
        expect(controller).toBeInstanceOf(BotController);
    });

    // navigateToHome
    test("navigateToHome should return a CardService.Card", () => {
        const actionResponse = BotControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory()
                    .build())
            .withTelegramBotClient(
                global.TelegramBotClientFactory
                    .withToken("YOUR_BOT_TOKEN")
                    .create())
            .build()
            .navigateToHome()
        //.build();

        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        //console.log(card);
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
    });

    // navigateToCreateBot
    test("navigateToCreateBot should return a CardService.Card", () => {
        const actionResponse = controller.navigateToCreateBot();
        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
    });

    test("BotControllerFactory should throw error if userStore is invalid", () => {
        expect(() => {
            BotControllerFactory.create()
                .withUserStore({})
                .withTelegramBotClient(
                    global.TelegramBotClientFactory
                        .withToken("YOUR_BOT_TOKEN")
                        .create())
                .build();
        }).toThrow("userStore must be an instance of UserStore");
    });

    test("BotControllerFactory should throw error if telegramBotClient is invalid", () => {
        expect(() => {
            BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory()
                        .build())
                .withTelegramBotClient({})
                .build();
        }).toThrow("telegramBotClient must be an instance of TelegramBotClient");
    });

    // navigateToAutomations
    test("navigateToAutomations should return a CardService.Card", () => {
        const actionResponse = controller.navigateToAutomations();
        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
    });

    // navigateToSettings
    test("navigateToSettings should return a CardService.Card", () => {
        const actionResponse = controller.navigateToSettings();
        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
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
        const actionResponse = controller.registerBotToken(token);
        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
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
        const res = actionResponse.build().getData();
        expect(res.cardNavigations[0].popToRoot).toBeDefined();
        expect(res.cardNavigations[1].updateCard).toBeDefined();
    });
});
