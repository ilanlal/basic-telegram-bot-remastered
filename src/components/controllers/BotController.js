class BotController {
    constructor(userStore) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }

         /** @type {UserStore} */
        this._userStore = userStore;
        this._botTokenSet = () => !!this._userStore.getTelegramBotInfo();
        this._webhookSet = () => {
            const botInfo = this._userStore.getTelegramBotInfo();
            const token = botInfo ? botInfo.getBotToken() : null;
            if (!token) {
                return false;
            }
            const telegramBotClient = new TelegramBotClient(token);
            const response = telegramBotClient.getWebhookInfo();
            if (response.getResponseCode() !== 200) {
                return false;
            }
            const contentText = response.getContentText();
            const res = JSON.parse(contentText);
            return res.result.url !== '';
        };
    }

    navigateToHome() {
        const state = {
            webhookSet: this._webhookSet(),
            botTokenSet: this._botTokenSet()
        };

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
                                this._userStore.getTelegramBotInfo()
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
                            .withBotInfo(this._userStore
                                .getTelegramBotInfo())
                            .newCardBuilder()
                            .build()
                    )
            );
    }

    registerBotToken(token) {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }

        this._telegramBotClient = new TelegramBotClient(token);

        const response = this._telegramBotClient.getMe();

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

        this._userStore
            .setTelegramBotInfo(
                new TelegramBotInfo()
                    .setName(user.getUsername())
                    .setBotToken(token)
                    .setCreatedOn(new Date())
                    .setLastSync(new Date())
                    .setUser(user)
            );

        return CardService.newActionResponseBuilder()
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

        const response = this._telegramBotClient.setWebhook(url);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set webhook");
        }

        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .setState(
                                { webhookSet: true, botTokenSet: true }
                            )
                            .build()
                    ));
    }

    deleteWebhook() {
        const response = this._telegramBotClient.deleteWebhook();
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to delete webhook");
        }

        return this.navigateToHome();
    }
}

class BotControllerFactory {
    constructor() {
        this._userStore = null;
    }

    withUserStore(userStore) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }

        this._userStore = userStore;
        return this;
    }

    build() {
        return new BotController(this._userStore);
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