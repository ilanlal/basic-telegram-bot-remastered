const {
    MockCardService,
    MockCardServiceFactory
} = require('../../tests/mocks/MockCardService.js');

const { AuthUser } = require('../models/AuthUser.js');
const { TelegramBotInfo } = require('../models/TelegramBotInfo.js');
const {
    BotSetupCard,
    BotCardFactory
} = require('./BotSetupCard.js');

const { AppManager } = require('../../helpers/AppManager');

describe("BotSetupCard Factory Tests", () => {
    let factory;

    beforeEach(() => {
        factory = BotCardFactory.newBotCardFactory()
            .withAuthUserInfo(new AuthUser())
            .withTelegramBotInfo(new TelegramBotInfo())
            .withCardService(MockCardServiceFactory
                .newFactory().getCardService())
            .withLocalization(AppManager.getLocalizationResources());
    });

    test("should create a BotSetupCard with the correct localization", () => {
        const card = factory.build();
        expect(card).toBeInstanceOf(BotSetupCard);
    });
});