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
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }

        const safeToken = decodeURIComponent(token);

        const response = new TelegramBotClient(safeToken)
            .getMe();

        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to validate bot token: " + safeToken);
        }

        const content = response.getContentText();
        return JSON.parse(content).result;
    }

    setNewBotToken(token) {
        const safeToken = decodeURIComponent(token);
        return this._userProperties.setProperty(SetupFlow.InputMeta.BOT_API_TOKEN, safeToken);
    }

    setNewDeploymentId(id) {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error("Invalid deployment ID");
        }
        const safeId = decodeURIComponent(id);
        return this._userProperties.setProperty(SetupFlow.InputMeta.DEPLOYMENT_ID, safeId);
    }

    setNewChatId(id) {
        if (!id || typeof parseInt(id) !== 'number') {
            throw new Error("Invalid chat ID");
        }
        return this._userProperties.setProperty(SetupFlow.InputMeta.ADMIN_CHAT_ID, id.toString());
    }

    setDebugMode(isDebug) {
        const debugValue = isDebug ? 'true' : 'false';
        return this._userProperties.setProperty(SetupFlow.InputMeta.DEBUG_MODE, debugValue);
    }

    setDefaultLanguage(languageCode) {
        if (!languageCode || typeof languageCode !== 'string' || languageCode.trim() === '') {
            throw new Error("Invalid language code");
        }
        return this._userProperties.setProperty(SetupFlow.InputMeta.DEFAULT_LANGUAGE, languageCode);
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
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotSetupController };
}