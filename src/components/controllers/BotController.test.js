/* eslint-disable no-undef */
require('../models'); // Ensure the model is loaded
require('../views'); // Ensure the component is loaded
require('../../'); // index.js
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
                    TelegramBotClientFactory.newTelegramBotClientFactory()
                        .withToken("YOUR_BOT_TOKEN")
                        .build())
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

    test("navigateToHome should return a CardService.Card", () => {
        const actionResponse = BotControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory()
                    .build())
            .withTelegramBotClient(
                TelegramBotClientFactory.newTelegramBotClientFactory()
                    .withToken("YOUR_BOT_TOKEN")
                    .build())
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

    // navigateToSetup 
    test("navigateToSetup should return a CardService.Card", () => {
        const actionResponse = controller.navigateToSetup();
        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
    });

    test("saveBotToken should return a CardService.ActionResponse", () => {
        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    [BotSetupCard.INPUTS.BOT_TOKEN]: {
                        stringInputs: {
                            value: ["TEST_BOT_TOKEN"]
                        }
                    }
                }
            }
        };

        const actionResponse = controller.saveBotToken(mockEvent);
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
                    TelegramBotClientFactory.newTelegramBotClientFactory()
                        .withToken("YOUR_BOT_TOKEN")
                        .build())
                .build();
        }).toThrow("userStore must be an instance of UserStore");
    });

    // withTelegramBotClient throws error if invalid
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
});
