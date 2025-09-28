require("@ilanlal/gasmocks");
require('../types'); // Ensure the model is loaded
const { UserStore, UserStoreFactory } = require('./UserStore');

describe('UserStore Service Tests', () => {
    const factory = UserStoreFactory.create();
    let userStore;

    beforeEach(() => {
        userStore = factory.next;
    });

    test("UserStore instance should be created", () => {
        expect(userStore).toBeInstanceOf(UserStore);
    });

    test("UserStore should set and get TelegramBotInfo correctly", () => {
        const botInfo = new global.TelegramBotInfo()
            .setBotToken('test_bot_token')
            .setCreatedOn(new Date())
            .setLastSync(new Date())
            .setUser(null); // or set a valid TelegramUser instance

        userStore.setTelegramBotInfo(botInfo);
        const retrievedBotInfo = userStore.getTelegramBotInfo();

        expect(retrievedBotInfo).toBeDefined();
        expect(retrievedBotInfo.getBotToken()).toBe('test_bot_token');
        expect(retrievedBotInfo.getCreatedOn()).toEqual(botInfo.getCreatedOn());
        expect(retrievedBotInfo.getLastSync()).toEqual(botInfo.getLastSync());
        expect(retrievedBotInfo.getUser()).toEqual(botInfo.getUser());
    });

    test("UserStore should clear TelegramBotInfo correctly", () => {
        const botInfo = new TelegramBotInfo()
            .setBotToken('test_bot_token')
            .setCreatedOn(new Date())
            .setLastSync(new Date())
            .setUser(null); // or set a valid TelegramUser instance

        userStore.setTelegramBotInfo(botInfo);
        userStore.clearTelegramBotInfo();
        const clearedBotInfo = userStore.getTelegramBotInfo();

        expect(clearedBotInfo).toBeUndefined();
    });
});

