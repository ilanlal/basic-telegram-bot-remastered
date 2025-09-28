class BotController {
    constructor(userStore) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }

        /** @type {UserStore} */
        this._userStore = userStore;
    }

    static create(userStore = new UserStore()) {
        return new BotController(userStore);
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

        return this._userStore
            .setTelegramBotInfo(
                new TelegramBotInfo()
                    .setName(user.getUsername())
                    .setBotToken(token)
                    .setCreatedOn(new Date())
                    .setLastSync(new Date())
                    .setUser(user)
            );
    }

    saveBotSettings({name, shortDescription, longDescription}) {
        return { status: 'success', message: `Bot name "${name}" saved successfully.` };
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


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BotController
    };
}