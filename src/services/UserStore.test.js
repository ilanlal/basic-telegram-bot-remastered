const {
    TelegramBotInfo,
    TelegramBotInfoBuilder
} = require('../components/models/TelegramBotInfo.js');

const {
    UserStoreFactory,
    UserStore
} = require('./UserStore.js');

const {
    MockPropertiesService
} = require('../tests/mocks/MockPropertiesService.js');

describe('UserStore Service Tests', () => {
    let userStore;

    beforeEach(() => {
        userStore = UserStoreFactory.newUserStoreFactory()
            .withUserProperties(MockPropertiesService.getUserProperties())
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
});

