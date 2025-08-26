const { AppManager } = require('../../helpers/AppManager');
const { TelegramBotClientFactory } = require('../../libs/TelegramBotClient');
const { UserStoreFactory } = require('../../services/UserStore');

const {
    BotController,
    BotControllerFactory
} = require('../controllers/BotController');

describe('BotController Tests', () => {
    let botController;
    let botControllerFactory;

    beforeEach(() => {
        botControllerFactory = BotControllerFactory
            .newBotControllerFactory();
        botController = botControllerFactory
            .withLocalization(AppManager.getLocalizationResources())
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
});
