class BotSetupController {
    get telegramBotClient() {
        if (!this._telegramBotClient) {
            const token = this._userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
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
        const safeToken = decodeURIComponent(token);
        return SetupFlow.create(this._userProperties)
            .identifyNewBotToken(safeToken);
    }

    setNewBotToken(token) {
        const safeToken = decodeURIComponent(token);
        return EnvironmentModel.create(this._userProperties)
            .setNewBotToken(safeToken);
    }

    setNewDeploymentId(id) {
        const safeId = decodeURIComponent(id);
        return EnvironmentModel.create(this._userProperties)
            .setNewDeploymentId(safeId);
    }

    setNewChatId(id) {
        const safeId = decodeURIComponent(id);
        return EnvironmentModel.create(this._userProperties)
            .setMyNewChatId(safeId);
    }

    setDebugMode(isDebug) {
        return EnvironmentModel.create(this._userProperties)
            .setDebugMode(isDebug);
    }

    setNewDefaultLanguage(languageCode) {
        return EnvironmentModel.create(this._userProperties)
            .setNewDefaultLanguage(languageCode);
    }

    setNewActiveSpreadsheetId(spreadsheetId) {
        const safeId = decodeURIComponent(spreadsheetId);
        return EnvironmentModel.create(this._userProperties)
            .setNewActiveSpreadsheetId(safeId);
    }

    setWebhook() {
        return SetupFlow.create(this._userProperties).setWebhook();
    }

    deleteWebhook() {
        return SetupFlow.create(this._userProperties).deleteWebhook();
    }

    setMyName() {
        return SetupFlow.create(this._userProperties).setMyName();
    }

    setMyDescription() {
        return SetupFlow.create(this._userProperties).setMyDescription();
    }

    setMyShortDescription() {
        return SetupFlow.create(this._userProperties).setMyShortDescription();
    }

    setMyCommands() {
        return SetupFlow.create(this._userProperties).setMyCommands();
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotSetupController };
}