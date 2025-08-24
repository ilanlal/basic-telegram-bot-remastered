const {
    TelegramBotClient,
    TelegramBotClientFactory,
    getTelegramBotClient
} = require('./TelegramBotClient.js');

describe('TelegramBotClient Tests', () => {
    let telegramBotClient;

    beforeEach(() => {
        telegramBotClient = TelegramBotClientFactory.newTelegramBotClientFactory()
            .withToken('[YOUR_BOT_TOKEN]')
            .build();
    });

    test("TelegramBotClient should be defined", () => {
        expect(TelegramBotClient).toBeDefined();
    });

    test("TelegramBotClientFactory should be defined", () => {
        expect(TelegramBotClientFactory).toBeDefined();
    });

    test("getTelegramBotClient should be defined", () => {
        expect(getTelegramBotClient).toBeDefined();
    });
});
