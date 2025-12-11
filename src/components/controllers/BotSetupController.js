class BotSetupController {
    get telegramBotClient() {
        if (!this._telegramBotClient) {
            const token = this._documentProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
            if (!token) {
                return null;
            }
            this._telegramBotClient = new TelegramBotClient(token);
        }
        return this._telegramBotClient;
    }

    constructor(documentProperties, activeSpreadsheet) {
        this._telegramBotClient = null;
        this._documentProperties = documentProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    static create(
        documentProperties = PropertiesService.getDocumentProperties(),
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    ) {
        return new BotSetupController(documentProperties, activeSpreadsheet);
    }

    identifyNewBotToken(token) {
        const safeToken = decodeURIComponent(token);
        return SetupFlow.create(this._documentProperties, this._activeSpreadsheet)
            .identifyNewBotToken(safeToken);
    }

    setNewBotToken(token) {
        const safeToken = decodeURIComponent(token);
        return EnvironmentModel.create(this._documentProperties)
            .setNewBotToken(safeToken);
    }

    setNewDeploymentId(id) {
        const safeId = decodeURIComponent(id);
        return EnvironmentModel.create(this._documentProperties)
            .setNewDeploymentId(safeId);
    }

    setNewChatId(id) {
        const safeId = decodeURIComponent(id);
        return EnvironmentModel.create(this._documentProperties)
            .setMyNewChatId(safeId);
    }

    setDebugMode(debugValue) {
        return EnvironmentModel.create(this._documentProperties)
            .setDebugMode(debugValue);
    }

    setNewDefaultLanguage(languageCode) {
        return EnvironmentModel.create(this._documentProperties)
            .setNewDefaultLanguage(languageCode);
    }

    setNewActiveSpreadsheetId(spreadsheetId) {
        const safeId = decodeURIComponent(spreadsheetId);
        return EnvironmentModel.create(this._documentProperties)
            .setNewActiveSpreadsheetId(safeId);
    }

    setNewEnvironment(env) {
        return EnvironmentModel.create(this._documentProperties)
            .setNewEnvironment(env);
    }

    setNewWebhookCallbackUrl(url) {
        return EnvironmentModel.create(this._documentProperties)
            .setNewWebhookCallbackUrl(url);
    }

    setNewTestDeploymentId(id) {
        return EnvironmentModel.create(this._documentProperties)
            .setNewTestDeploymentId(id);
    }

    setWebhook() {
        return SetupFlow.create(this._documentProperties, this._activeSpreadsheet)
            .setWebhook();
    }

    deleteWebhook() {
        return SetupFlow.create(this._documentProperties, this._activeSpreadsheet)
            .deleteWebhook();
    }

    setMyName() {
        return SetupFlow.create(this._documentProperties, this._activeSpreadsheet)
            .setMyName();
    }

    setMyDescription() {
        return SetupFlow.create(this._documentProperties, this._activeSpreadsheet)
            .setMyDescription();
    }

    setMyShortDescription() {
        return SetupFlow.create(this._documentProperties, this._activeSpreadsheet)
            .setMyShortDescription();
    }

    setMyCommands() {
        return SetupFlow.create(this._documentProperties, this._activeSpreadsheet)
            .setMyCommands();
    }

    setLogArchiveSize(size) {
        return EnvironmentModel.create(this._documentProperties)
            .setLogArchiveSize(size);
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotSetupController };
}