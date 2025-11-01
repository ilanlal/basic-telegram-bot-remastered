class SetupFlow {
    constructor(userStore, userProperties) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }
        this._userProperties = userProperties;
        this._userStore = userStore;
        this._telegramBotClient = null;
        
    }

    static create(
        userStore = UserStoreFactory.create().current,
        userProperties = PropertiesService.getUserProperties()
    ) {
        return new SetupFlow(userStore, userProperties);
    }

    setNewDefaultLanguage(code) {
        if (!code || typeof code !== 'string' || code.trim() === '') {
            throw new Error("Invalid language code");
        }
        return this._userProperties.setProperty(SetupFlow.InputMeta.DEFAULT_LANGUAGE, code);
    }

    setNewBotToken(token) {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }
        const safeToken = decodeURIComponent(token);

        const response = new TelegramBotClient(safeToken).getMe();
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to validate bot token");
        }
        return this._userProperties.setProperty(SetupFlow.InputMeta.BOT_API_TOKEN, safeToken);
    }

    setNewDeploymentId(id) {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error("Invalid deployment ID");
        }

        const safeId = decodeURIComponent(id);
        return this._userProperties.setProperty(SetupFlow.InputMeta.DEPLOYMENT_ID, safeId);
    }

    setMyNewChatId(id) {
        if (!id || typeof id !== 'number') {
            throw new Error("Invalid chat ID");
        }
        const safeId = decodeURIComponent(id);
        return this._userProperties.setProperty(SetupFlow.InputMeta.ADMIN_CHAT_ID, safeId);
    }

    setWebhook() {
        const deploymentId = this._userProperties.getProperty(SetupFlow.InputMeta.DEPLOYMENT_ID);
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
        const deploymentId = this._userProperties.getProperty(SetupFlow.InputMeta.DEPLOYMENT_ID);
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

    // Getters
    get trafficLight() {
        const leds = '{0}{1}{2}{3}{4}';
        const led0 = this.stateObject.botTokenSet ? Lights.ON : Lights.OFF;
        const led1 = this.stateObject.deploymentIdSet ? Lights.ON : Lights.OFF;
        const led2 = this.stateObject.webhookSet ? Lights.ON : Lights.OFF;
        const led3 = this.stateObject.chatIdSet ? Lights.ON : Lights.OFF;
        const led4 = this.stateObject.defaultLanguageSet ? Lights.ON : Lights.WARN;

        return leds
            .replace('{0}', led0)
            .replace('{1}', led1)
            .replace('{2}', led2)
            .replace('{3}', led3)
            .replace('{4}', led4);
    }

    get isActive() {
        return this.stateObject.botTokenSet &&
            this.stateObject.deploymentIdSet &&
            this.stateObject.webhookSet &&
            this.stateObject.chatIdSet &&
            this.stateObject.defaultLanguageSet;
    }
    get state() {
        return [
            { name: EMD.Home, value: this.stateObject.botToken, isSet: this.stateObject.botTokenSet },
            { name: 'deploymentId', value: this.stateObject.deploymentId, isSet: this.stateObject.deploymentIdSet },
            { name: 'webhookUrl', value: this.stateObject.webhookUrl, isSet: this.stateObject.webhookSet },
            { name: 'chatId', value: this.stateObject.chatId, isSet: this.stateObject.chatIdSet },
            { name: 'defaultLanguage', value: this.stateObject.defaultLanguage, isSet: this.stateObject.defaultLanguageSet },
        ];
    }

    get stateObject() {
        return {
            botToken: this._userProperties.getProperty(SetupFlow.InputMeta.BOT_API_TOKEN),
            botTokenSet: !!this._userProperties.getProperty(SetupFlow.InputMeta.BOT_API_TOKEN),
            deploymentId: this._userProperties.getProperty(SetupFlow.InputMeta.DEPLOYMENT_ID),
            deploymentIdSet: !!this._userProperties.getProperty(SetupFlow.InputMeta.DEPLOYMENT_ID),
            webhookUrl: this.webhookUrl,
            webhookSet: !!this.webhookUrl,
            chatId: this._userProperties.getProperty(SetupFlow.InputMeta.ADMIN_CHAT_ID),
            chatIdSet: !!this._userProperties.getProperty(SetupFlow.InputMeta.ADMIN_CHAT_ID),
            defaultLanguage: this._userProperties.getProperty(SetupFlow.InputMeta.DEFAULT_LANGUAGE),
            defaultLanguageSet: !!this._userProperties.getProperty(SetupFlow.InputMeta.DEFAULT_LANGUAGE),
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
}

SetupFlow.InputMeta = {
    BOT_API_TOKEN: 'bot_api_token',
    DEPLOYMENT_ID: 'deployment_id',
    ADMIN_CHAT_ID: 'admin_chat_id',
    DEFAULT_LANGUAGE: 'default_language',
    DEBUG_MODE: 'debug_mode'
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SetupFlow };
}