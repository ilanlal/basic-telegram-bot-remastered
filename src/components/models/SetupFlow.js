class SetupFlow {
    static ON_LIGHT = '🟢';
    static OFF_LIGHT = '🔘';
    static WARN_LIGHT = '🟡';
    static ERROR_LIGHT = '🔴';

    get trafficLight() {
        const leds = '{0}{1}{2}{3}{4}';
        const led0 = this.state.botTokenSet ? SetupFlow.ON_LIGHT : SetupFlow.OFF_LIGHT;
        const led1 = this.state.deploymentIdSet ? SetupFlow.ON_LIGHT : SetupFlow.OFF_LIGHT;
        const led2 = this.state.webhookSet ? SetupFlow.ON_LIGHT : SetupFlow.OFF_LIGHT;
        const led3 = this.state.chatIdSet ? SetupFlow.ON_LIGHT : SetupFlow.OFF_LIGHT;
        const led4 = this.state.defaultLanguageSet ? SetupFlow.ON_LIGHT : SetupFlow.WARN_LIGHT;

        return leds
            .replace('{0}', led0)
            .replace('{1}', led1)
            .replace('{2}', led2)
            .replace('{3}', led3)
            .replace('{4}', led4);
    }

    get isActive() {
        return this.state.botTokenSet &&
            this.state.deploymentIdSet &&
            this.state.webhookSet &&
            this.state.chatIdSet &&
            this.state.defaultLanguageSet;
    }

    get state() {
        return {
            botToken: this._userStore.getBotToken(),
            botTokenSet: !!this._userStore.getBotToken(),
            deploymentId: this._userStore.getDeploymentId(),
            deploymentIdSet: !!this._userStore.getDeploymentId(),
            webhookUrl: this.webhookUrl,
            webhookSet: !!this.webhookUrl,
            chatId: this._userStore.getMyChatId(),
            chatIdSet: !!this._userStore.getMyChatId(),
            defaultLanguage: this._userStore.getLocalizationCode(),
            defaultLanguageSet: !!this._userStore.getLocalizationCode(),
        }
    }

    get telegramBotClient() {
        if (!this._telegramBotClient) {
            const token = this._userStore.getBotToken();
            if (!token) {
                return null;
            }
            this._telegramBotClient = new TelegramBotClient(token);
        }
        return this._telegramBotClient;
    }

    get webhookUrl() {
        if (!this.telegramBotClient) {
            return null;
        }
        const response = this.telegramBotClient
            .getWebhookInfo();

        if (response.getResponseCode() !== 200) {
            return null;
        }
        return JSON.parse(response.getContentText())?.result?.url || null;
    }

    constructor(userStore) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }
        this._userStore = userStore;
        this._telegramBotClient = null;
    }

    setNewDefaultLanguage(code) {
        if (!code || typeof code !== 'string' || code.trim() === '') {
            throw new Error("Invalid language code");
        }
        return this._userStore.setLocalizationCode(code);
    }

    setNewBotToken(token) {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }

        const response = new TelegramBotClient(token).getMe();
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to validate bot token");
        }
        return this._userStore.setBotToken(token);
    }

    setNewDeploymentId(id) {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error("Invalid deployment ID");
        }
        return this._userStore.setDeploymentId(id);
    }

    setMyNewChatId(id) {
        if (!id || typeof id !== 'number') {
            throw new Error("Invalid chat ID");
        }
        return this._userStore.setMyChatId(id);
    }

    setWebhook() {
        const deploymentId = this._userStore.getDeploymentId();
        if (!deploymentId) {
            throw new Error("Deployment ID is not available. Please deploy the script as a web app.");
        }
        const webhookUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

        const response = this.telegramBotClient.setWebhook(webhookUrl);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set webhook");
        }

        return JSON.parse(response.getContentText());
    }

    deleteWebhook() {
        const deploymentId = this._userStore.getDeploymentId();
        if (!deploymentId) {
            throw new Error("Deployment ID is not available. Please deploy the script as a web app.");
        }
        const webhookUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

        const response = this.telegramBotClient
            .deleteWebhook(webhookUrl);

        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to delete webhook");
        }

        return JSON.parse(response.getContentText());
    }

    static create(userStore = UserStoreFactory.create().current) {
        return new SetupFlow(userStore);
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SetupFlow };
}