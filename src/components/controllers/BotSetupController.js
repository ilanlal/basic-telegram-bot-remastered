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

    constructor(userProperties, activeSpreadsheet) {
        this._telegramBotClient = null;
        this._userProperties = userProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    static create(userProperties = PropertiesService.getUserProperties(),
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new BotSetupController(userProperties, activeSpreadsheet);
    }

    identifyNewBotToken(token) {
        const safeToken = decodeURIComponent(token);
        return SetupFlow.create(this._userProperties, this._activeSpreadsheet)
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

    setNewEnvironment(env) {
        return EnvironmentModel.create(this._userProperties)
            .setNewEnvironment(env);
    }

    setNewWebhookCallbackUrl(url) {
        return EnvironmentModel.create(this._userProperties)
            .setNewWebhookCallbackUrl(url);
    }

    setNewTestDeploymentId(id) {
        return EnvironmentModel.create(this._userProperties)
            .setNewTestDeploymentId(id);
    }

    setWebhook() {
        return SetupFlow.create(this._userProperties, this._activeSpreadsheet)
            .setWebhook();
    }

    deleteWebhook() {
        return SetupFlow.create(this._userProperties, this._activeSpreadsheet)
            .deleteWebhook();
    }

    setMyName() {
        return SetupFlow.create(this._userProperties, this._activeSpreadsheet)
            .setMyName();
    }

    setMyDescription() {
        return SetupFlow.create(this._userProperties, this._activeSpreadsheet)
            .setMyDescription();
    }

    setMyShortDescription() {
        return SetupFlow.create(this._userProperties, this._activeSpreadsheet)
            .setMyShortDescription();
    }

    setMyCommands() {
        return SetupFlow.create(this._userProperties, this._activeSpreadsheet)
            .setMyCommands();
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotSetupController };
}