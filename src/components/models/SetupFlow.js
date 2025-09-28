class SetupFlow {
    get state() {
        return {
            botToken: this._userStore.getBotToken(),
            botTokenSet: !!this._userStore.getBotToken(),
            deploymentId: this._userStore.getDeploymentId(),
            deploymentIdSet: !!this._userStore.getDeploymentId(),
            webhookUrl: this.webhookUrl,
            webhookSet: !!this.webhookUrl,
            chatId: this._userStore.getMyChatId(),
            chatIdSet: !!this._userStore.getMyChatId()
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