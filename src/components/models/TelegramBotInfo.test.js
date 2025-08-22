const { TelegramUser } = require('./TelegramUser.js');
const { TelegramBotInfo, TelegramBotInfoBuilder } = require('./TelegramBotInfo.js');

describe('TelegramBotInfo Model Tests', () => {
    test('TelegramBotInfo should have a default constructor', () => {
        const botInfo = TelegramBotInfo.newTelegramBotInfo()
            .setBotToken('test_bot_token')
            .setCreatedOn(new Date())
            .setLastSync(new Date())
            .setUser(TelegramUser.newTelegramUser());

        expect(botInfo.getBotToken()).toBe('test_bot_token');
        expect(botInfo.getCreatedOn()).toBeInstanceOf(Date);
        expect(botInfo.getLastSync()).toBeInstanceOf(Date);
        expect(botInfo.getUser()).toBeInstanceOf(TelegramUser);
    });

    test('TelegramBotInfo should serialize and deserialize correctly', () => {
        const botInfo = TelegramBotInfo.newTelegramBotInfo()
            .setBotToken('test_bot_token')
            .setCreatedOn(new Date())
            .setLastSync(new Date())
            .setUser(TelegramUser.newTelegramUser());

        const jsonString = botInfo.toJsonString();
        const expectedBotInfo = TelegramBotInfo.fromJsonString(jsonString);

        expect(expectedBotInfo.getBotToken()).toBe('test_bot_token');
        expect(expectedBotInfo.getCreatedOn()).toEqual(botInfo.getCreatedOn());
        expect(expectedBotInfo.getLastSync()).toEqual(botInfo.getLastSync());
        expect(expectedBotInfo.getUser()).toEqual(botInfo.getUser());
    });

    describe('TelegramBotInfoBuilder Tests', () => {
        test('TelegramBotInfoBuilder should build TelegramBotInfo correctly', () => {
            const botInfo = new TelegramBotInfoBuilder()
                .setBotToken('test_bot_token')
                .setCreatedOn(new Date())
                .setLastSync(new Date())
                .setUser(TelegramUser.newTelegramUser())
                .build();

            expect(botInfo.getBotToken()).toBe('test_bot_token');
            expect(botInfo.getCreatedOn()).toBeInstanceOf(Date);
            expect(botInfo.getLastSync()).toBeInstanceOf(Date);
            expect(botInfo.getUser()).toBeInstanceOf(TelegramUser);
        });
    });
});