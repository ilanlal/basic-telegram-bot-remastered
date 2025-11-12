class BotSetupController {
    get telegramBotClient() {
        if (!this._telegramBotClient) {
            const token = this._userProperties.getProperty(SetupFlow.InputMeta.BOT_API_TOKEN);
            if (!token) {
                return null;
            }
            this._telegramBotClient = new TelegramBotClient(token);
        }
        return this._telegramBotClient;
    }

    constructor(userProperties) {
        this._telegramBotClient = null;
        this._userProperties = userProperties;
    }

    static create(userProperties = PropertiesService.getUserProperties()) {
        return new BotSetupController(userProperties);
    }

    identifyNewBotToken(token) {
        return SetupFlow.create(this._userProperties)
            .identifyNewBotToken(token);
    }

    setNewBotToken(token) {
        const safeToken = decodeURIComponent(token);
        return this._userProperties.setProperty(SetupFlow.InputMeta.BOT_API_TOKEN, safeToken);
    }

    setNewDeploymentId(id) {
        return SetupFlow.create(this._userProperties)
            .setNewDeploymentId(id);
    }

    setNewChatId(id) {
        return SetupFlow.create(this._userProperties)
            .setMyNewChatId(id);
    }

    setDebugMode(isDebug) {
        return SetupFlow.create(this._userProperties)
            .setDebugMode(isDebug);
    }

    setDefaultLanguage(languageCode) {
        return SetupFlow.create(this._userProperties)
            .setNewDefaultLanguage(languageCode);
    }

    setWebhook() {
        return SetupFlow.create(this._userProperties).setWebhook();
    }

    deleteWebhook() {
        return SetupFlow.create(this._userProperties).deleteWebhook();
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotSetupController };
}