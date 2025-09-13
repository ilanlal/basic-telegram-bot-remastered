/* eslint-disable no-undef */
require('../components/models'); // Ensure the model is loaded
require('../../__mocks__'); // index.js
const { UserStore, UserStoreFactory } = require('./UserStore');

describe('UserStore Service Tests', () => {
    let userStore;

    beforeEach(() => {
        userStore = UserStoreFactory.newUserStoreFactory()
            .build();
    });

    // Add your test cases here
    test("UserStore should be defined", () => {
        expect(UserStore).toBeDefined();
    });

    test("UserStoreFactory should be defined", () => {
        expect(UserStoreFactory).toBeDefined();
    });

    test("UserStore instance should be created", () => {
        expect(userStore).toBeInstanceOf(UserStore);
    });

    test("UserStore should get default TelegramBotInfo when none is set", () => {
        const botInfo = userStore.getTelegramBotInfo();
        expect(botInfo).toBeDefined();
        expect(botInfo).toBeInstanceOf(TelegramBotInfo);
    });

    test("UserStore should set and get TelegramBotInfo correctly", () => {
        const botInfo = new TelegramBotInfo()
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

        expect(clearedBotInfo).toBeDefined();
        expect(clearedBotInfo.getBotToken()).toBe('[YOUR_BOT_TOKEN]');
        expect(clearedBotInfo.getCreatedOn()).toBeNull();
        expect(clearedBotInfo.getLastSync()).toBeNull();
        expect(clearedBotInfo.getUser()).toBeNull();
    });
});

