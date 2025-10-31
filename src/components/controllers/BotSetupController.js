class BotSetupController {
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

    constructor(userStore, userProperties) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }
        this._userStore = userStore;
        this._telegramBotClient = null;
        this._userProperties = userProperties;
    }

    static create(userStore = UserStoreFactory.create().current, userProperties = PropertiesService.getUserProperties()) {
        return new BotSetupController(userStore, userProperties);
    }

    identifyNewBotToken(token) {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }

        const safeToken = decodeURIComponent(token);

        const response = new TelegramBotClient(safeToken).getMe();
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to validate bot token: " + safeToken);
        }

        return this;
    }

    setNewBotToken(token) {
        const safeToken = decodeURIComponent(token);
        return this._userProperties.setProperty('bot_api_token', safeToken);
    }

    setNewDeploymentId(id) {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error("Invalid deployment ID");
        }
        const safeId = decodeURIComponent(id);
        return this._userProperties.setProperty('deployment_id', safeId);
    }

    setNewChatId(id) {
        if (!id || typeof id !== 'number') {
            throw new Error("Invalid chat ID");
        }
        return this._userProperties.setProperty('admin_chat_id', id.toString());
    }

    setDebugMode(isDebug) {
        const debugValue = isDebug ? 'true' : 'false';
        return this._userProperties.setProperty('debug_mode', debugValue);
    }

    setDefaultLanguage(languageCode) {
        if (!languageCode || typeof languageCode !== 'string' || languageCode.trim() === '') {
            throw new Error("Invalid language code");
        }
        return this._userProperties.setProperty('default_language', languageCode);
    }

    setWebhook() {
        const deploymentId = this._userProperties.getProperty('deployment_id');
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
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotSetupController };
}