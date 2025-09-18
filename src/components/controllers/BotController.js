class BotController {
    constructor(userStore) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }

        /** @type {UserStore} */
        this._userStore = userStore;
        this._botTokenSet = () => !!this._userStore.getTelegramBotInfo();
        this._deploymentId = () => this._userStore.getDeploymentId();
        this._telegramBotClient = () => {
            const botInfo = this._userStore.getTelegramBotInfo();
            const token = botInfo ? botInfo.getBotToken() : null;
            if (!token) {
                return null;
            }
            return new TelegramBotClient(token);
        };
        this._webhookUrl = () => {
            return this._telegramBotClient()
                ?.getWebhookInfo()
                ?.getContentText();
        };
        this._webhookSet = () => {
            if (!this._botTokenSet() || !this._telegramBotClient()) {
                return false;
            }
            const response = this._telegramBotClient().getWebhookInfo();
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
            webhookUrl: this._webhookUrl() || "[Not Set]",
            botTokenSet: this._botTokenSet(),
            deploymentId: this._deploymentId() || ""
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

    navigateToDeploymentSettings() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new DeploymentCreateCard()
                            .build()
                    )
            );
    }

    registerBotToken(token) {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }

        const botClient = new TelegramBotClient(token);
        const response = botClient.getMe();

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
                                {
                                    webhookSet: this._webhookSet(),
                                    webhookUrl: this._webhookUrl() || "[Not Set]",
                                    botTokenSet: true,
                                    deploymentId: this._deploymentId()
                                }
                            )
                            .build()
                    ));
    }

    saveBotSettings(e) {
        //console.log("saveBotSettings called with event:", e);
        const name = e?.commonEventObject
            ?.formInputs?.['BOT_NAME']
            ?.stringInputs.value[0] || '';

        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .setState(
                                {
                                    webhookSet: true,
                                    webhookUrl: this._webhookUrl() || "[Not Set]",
                                    botTokenSet: true,
                                    deploymentId: this._deploymentId()
                                }
                            )
                            .build()
                    ));
    }

    setWebhook() {
        const deploymentId = this._deploymentId();
        if (!deploymentId) {
            throw new Error("Deployment ID is not available. Please deploy the script as a web app.");
        }
        const webhookUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

        const response = this._telegramBotClient().setWebhook(webhookUrl);
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
                                {
                                    webhookSet: true,
                                    webhookUrl: webhookUrl,
                                    botTokenSet: true,
                                    deploymentId: true
                                }
                            )
                            .build()
                    ));
    }

    deleteWebhook() {
        const deploymentId = this._deploymentId();
        if (!deploymentId) {
            throw new Error("Deployment ID is not available. Please deploy the script as a web app.");
        }
        const webhookUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

        const response = this._telegramBotClient()
            .deleteWebhook(webhookUrl);

        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to delete webhook");
        }

        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .setState(
                                {
                                    webhookSet: false,
                                    webhookUrl: "[Not Set]",
                                    botTokenSet: true,
                                    deploymentId: this._deploymentId()
                                }
                            )
                            .build()
                    ));
    }

    saveDeploymentSettings(e) {
        const deploymentId = e?.commonEventObject
            ?.formInputs?.['deploymentId']
            ?.stringInputs.value[0] || '';

        this._userStore.setDeploymentId(deploymentId);

        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .setState(
                                {
                                    webhookSet: this._webhookSet(),
                                    webhookUrl: this._webhookUrl() || "[Not Set]",
                                    botTokenSet: this._botTokenSet(),
                                    deploymentId: deploymentId
                                }
                            )
                            .build()
                    ));
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