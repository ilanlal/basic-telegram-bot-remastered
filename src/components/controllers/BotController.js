/* eslint-disable no-undef */
// version: 1.0.0

class BotController {
    constructor(userStore = null, telegramBotClient = null) {
        this._services = {
            /** @type {UserStore | null} */
            _userStore: userStore,
            /** @type {TelegramBotClient | null} */
            _telegramBotClient: telegramBotClient
        };
    }

    navigateToHome() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new HomeCard().build()
                    )
            );
    }

    navigateToSetup() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new BotSetupCard().build()
                    )
            );
    }

    saveBotToken(e) {
        //console.log("saveBotToken called with event:", e);

        const botToken = e?.commonEventObject
            ?.formInputs?.[BotSetupCard.INPUTS.BOT_TOKEN]
            ?.stringInputs.value[0] || BotSetupCard.INPUTS.BOT_TOKEN;

        //console.log("Bot token:", botToken);
        // Todo: getMe to approve validation
        this._services._userStore.setTelegramBotInfo(
            new TelegramBotInfo()
                .setBotToken(botToken)
                .setCreatedOn(new Date())
                .setLastSync(new Date())
                .setUser(TelegramUser.newTelegramUser())
        );

        return this.navigateToHome();
    }
}

class BotControllerFactory {
    constructor() {
        this._userStore = null; 
        this._telegramBotClient = null;
    }

    withUserStore(userStore) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }

        this._userStore = userStore;
        return this;
    }

    withTelegramBotClient(telegramBotClient) {
        if (!(telegramBotClient instanceof TelegramBotClient)) {
            throw new Error("telegramBotClient must be an instance of TelegramBotClient");
        }

        this._telegramBotClient = telegramBotClient;
        return this;
    }

    build() {
        return new BotController(
            this._userStore,
            this._telegramBotClient
        );
    }

    static create() {
        return new BotControllerFactory();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BotController,
        BotControllerFactory
    };
}