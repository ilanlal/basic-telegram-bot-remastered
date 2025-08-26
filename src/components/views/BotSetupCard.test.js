const { MockCardService, MockCardServiceFactory } = require('../../tests/mocks/MockCardService.js');
const { AuthUser } = require('../models/AuthUser.js');
const { TelegramBotInfo } = require('../models/TelegramBotInfo.js');
const { BotSetupCard, BotSetupCardFactory } = require('./BotSetupCard.js');
const { AppManager } = require('../../helpers/AppManager');

describe("BotSetupCard Factory Tests", () => {
    let factory;

    beforeEach(() => {
        factory = BotSetupCardFactory.newBotSetupCard()
            .withCardService(
                MockCardServiceFactory.newCardService()
            );
    });

    test("should create a BotSetupCard instance", () => {
        const card = factory.build();
        expect(card).toBeInstanceOf(BotSetupCard);
    });
});