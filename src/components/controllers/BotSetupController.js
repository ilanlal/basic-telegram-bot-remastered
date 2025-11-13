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
        // get list of [{name: 'Bot Name', language_code: 'en'}, ...]
        const botNames = [];
        botNames.forEach(({ name, language_code }) => {
            SetupFlow.create(this._userProperties).setMyName({ name, language_code });
        });
        return true;
    }

    setMyDescription() {
        const botDescriptions = [];
        botDescriptions.forEach(({ description, language_code }) => {
            SetupFlow.create(this._userProperties).setMyDescription({ description, language_code });
        });
        return true;
    }

    setMyShortDescription() {
        const botShortDescriptions = [];
        botShortDescriptions.forEach(({ short_description, language_code }) => {
            SetupFlow.create(this._userProperties).setMyShortDescription({ short_description, language_code });
        });
        return true;
    }

    setMyCommands() {
        const botCommandsList = [];
        botCommandsList.forEach(({ commands, language_code, scope }) => {
            SetupFlow.create(this._userProperties).setMyCommands({ commands, language_code, scope });
        });
        return true;
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotSetupController };
}