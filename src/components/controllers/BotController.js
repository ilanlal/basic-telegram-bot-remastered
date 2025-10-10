class BotController {
    constructor(userStore) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }

        /** @type {UserStore} */
        this._userStore = userStore;
    }

    static create(userStore = UserStoreFactory.create().current) {
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
        this._userStore.setBotToken(token);
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
        return SetupFlow.create(this._userStore).setWebhook();
    }

    deleteWebhook() {
        return SetupFlow.create(this._userStore).deleteWebhook();
    }

    saveMyChatId(chat_id) {
        if (!chat_id || isNaN(chat_id)) {
            throw new Error("Invalid chat_id");
        }
        this._userStore.setMyChatId(chat_id);
        return this;
    }

    saveDeploymentId(deploymentId) {
        if (!deploymentId || typeof deploymentId !== 'string') {
            throw new Error("Invalid deploymentId");
        }
        this._userStore.setDeploymentId(deploymentId);
        return this;
    }

    saveDefaultLanguage(languageCode) {
        if (!languageCode || typeof languageCode !== 'string') {
            throw new Error("Invalid language code");
        }
        this._userStore.setLocalizationCode(languageCode);
        return this;
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BotController
    };
}