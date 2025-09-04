/* eslint-disable no-undef */
// version: 1.0.0

class BotController {
    constructor(userStore = null, telegramBotClient = null) {
        this._services = {
            /** @type {UserStore} */
            userStore: userStore,
            /** @type {TelegramBotClient} */
            telegramBotClient: telegramBotClient
        };
    }

    navigateToHome(state = { webhookSet: false, botTokenSet: false }) {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new HomeCard()
                            .setState(state)
                            .build()
                    )
            );
    }

    navigateToSettings() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new BotSettingsCard()
                            .withTelegramBotInfo(
                                this._services.userStore.getTelegramBotInfo()
                            )
                            .newCardBuilder()
                            .build()
                    )
            );
    }

    navigateToCreateBot() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new BotCreateCard()
                            .newCardBuilder()
                            .build()
                    )
            );
    }

    navigateToAutomations() {
        // Placeholder for future implementation
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new BotAutomationsCard()
                            .withBotInfo(this._services.userStore
                                .getTelegramBotInfo())
                            .newCardBuilder()
                            .build()
                    )
            );
    }

    registerBotToken(token = '[YOUR_BOT_TOKEN]') {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }

        this._services.telegramBotClient = new TelegramBotClient(token);

        const response = this._services.telegramBotClient.getMe();

        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to validate bot token");
        }
        const contentText = response.getContentText();
        const res = JSON.parse(contentText);
        const user = new TelegramUser()
            .setId(res.result.id)
            .setIsBot(res.result.is_bot)
            .setFirstName(res.result.first_name)
            .setLastName(res.result.last_name)
            .setUsername(res.result.username)
            .setLanguageCode(res.result.language_code);

        this._services.userStore
            .setTelegramBotInfo(
                new TelegramBotInfo()
                    .setName(user.getUsername())
                    .setBotToken(token)
                    .setCreatedOn(new Date())
                    .setLastSync(new Date())
                    .setUser(user)
            );

        return this.navigateToHome(
            { webhookSet: false, botTokenSet: true }
        );
    }

    saveBotSettings(e) {
        //console.log("saveBotSettings called with event:", e);
        const name = e?.commonEventObject
            ?.formInputs?.['BOT_NAME']
            ?.stringInputs.value[0] || '';

        return global.CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .setState(
                                { webhookSet: false, botTokenSet: true }
                            )
                            .build()
                    ));
    }

    setWebhook(url) {
        if (!url || typeof url !== 'string' || url.trim() === '') {
            throw new Error("Invalid webhook URL");
        }

        const response = this._services.telegramBotClient.setWebhook(url);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set webhook");
        }

        return this.navigateToHome();
    }

    deleteWebhook() {
        const response = this._services.telegramBotClient.deleteWebhook();
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to delete webhook");
        }

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