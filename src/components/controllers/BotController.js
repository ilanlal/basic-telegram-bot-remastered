// version: 1.0.0
if(require) {
    AuthUser = require('../../models/AuthUser.js').AuthUser;
    TelegramUser = require('../../models/TelegramUser.js').TelegramUser;
    TelegramBotInfo = require('../../models/TelegramBotInfo.js').TelegramBotInfo;
    UserStore = require('../../services/UserStore.js').UserStore;
    TelegramBotClient = require('../../libs/TelegramBotClient.js').TelegramBotClient;
}

class BotController {
    constructor(LOCALIZE_STRINGS = null, userStore = null, telegramBotClient = null) {
        this._services = {
            /** @type {UserStore | null} */
            _userStore: userStore,
            /** @type {TelegramBotClient | null} */
            _telegramBotClient: telegramBotClient
        };
        this._models = {
            /** @type {Global_Resources['hl'] | null} */
            _LOCALIZE_STRINGS: LOCALIZE_STRINGS,
            /** @type {AuthUser | null} */
            _userInfo: this._services._userStore.getUserInfo()
        };

    }


    navigateToHome() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        ViewBuilder.newBotHomeCard(
                            this._models._LOCALIZE_STRINGS,
                            this._models._indentationLevel,
                            this._models._userInfo
                        )
                            .validate()
                            .build()
                    )
            );
    }

    navigateToSetup() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        ViewBuilder.newBotSetupCard(
                            this._models._LOCALIZE_STRINGS,
                            this._models._userInfo
                        )
                            .validate()
                            .build()
                    )
            );
    }

    saveBotToken(e) {
        console.log("saveBotToken called with event:", e);

        const botToken = e?.commonEventObject
            ?.formInputs?.[BotSetupCard.INPUTS.BOT_TOKEN]
            ?.stringInputs.value[0] || BotSetupCard.INPUTS.BOT_TOKEN;

        console.log("Bot token:", botToken);
        // Todo: getMe to approve validation
        this._services._userStore.setTelegramBotInfo(
            new TelegramBotInfoBuilder()
                .setBotToken(botToken)
                .setCreatedOn(new Date())
                .setLastSync(new Date())
                .setUser(TelegramUser.newTelegramUser())
                .build()
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

    build(LOCALIZE_STRINGS) {
        return new BotController(
            LOCALIZE_STRINGS,
            this._userStore,
            this._telegramBotClient
        );
    }

    static newBotControllerFactory() {
        return new BotControllerFactory();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BotController,
        BotControllerFactory
    };
}