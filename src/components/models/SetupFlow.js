class SetupFlow {
    constructor(userProperties) {
        this._userProperties = userProperties;
        this._telegramBotClient = null;

    }

    static create(
        userProperties = PropertiesService.getUserProperties()
    ) {
        return new SetupFlow(userProperties);
    }

    setNewDefaultLanguage(code) {
        if (!code || typeof code !== 'string' || code.trim() === '') {
            throw new Error("Invalid language code");
        }
        return this._userProperties.setProperty(SetupFlow.InputMeta.DEFAULT_LANGUAGE, code);
    }

    identifyNewBotToken(token) {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }
        const safeToken = decodeURIComponent(token);

        const response = new TelegramBotClient(safeToken).getMe();
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to validate bot token");
        }
        this.setNewBotToken(safeToken);

        const contentText = response.getContentText();
        const res = JSON.parse(contentText);
        return res.result;
    }

    setNewBotToken(token) {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }
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

    setMyNewChatId(id) {
        if (!id || isNaN(id)) {
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

    setDebugMode(isDebug) {
        const debugValue = isDebug ? 'true' : 'false';
        return this._userProperties.setProperty(SetupFlow.InputMeta.DEBUG_MODE, debugValue);
    }

    setNewActiveSpreadsheetId(spreadsheetId) {
        if (!spreadsheetId || typeof spreadsheetId !== 'string' || spreadsheetId.trim() === '') {
            spreadsheetId = '[current]';
        }

        const safeId = decodeURIComponent(spreadsheetId);
        return this._userProperties.setProperty(SetupFlow.InputMeta.ACTIVE_SPREADSHEET_ID, safeId);
    }

    setMyName(name, language_code) {  
        const response = this.telegramBotClient.setMyName(name, language_code);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot name");
        }
        return JSON.parse(response.getContentText());
    }

    setMyDescription(description, language_code) {
        const response = this.telegramBotClient.setMyDescription(description, language_code);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot description");
        }
        return JSON.parse(response.getContentText());
    }

    setMyShortDescription(short_description, language_code) {
        const response = this.telegramBotClient.setMyShortDescription(short_description, language_code);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot short description");
        }
        return JSON.parse(response.getContentText());
    }

    setMyCommands(commands, language_code, scope) {
        const response = this.telegramBotClient.setMyCommands(commands, language_code, scope);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot commands");
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
        const led5 = this.stateObject.debugModeSet ? Lights.ON : Lights.OFF;

        return leds
            .replace('{0}', led0)
            .replace('{1}', led1)
            .replace('{2}', led2)
            .replace('{3}', led3)
            .replace('{4}', led4)
            .replace('{5}', led5);
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
            { name: 'debugMode', value: this.stateObject.debugMode, isSet: this.stateObject.debugModeSet }
        ];
    }

    get stateObject() {
        const token = this._userProperties.getProperty(SetupFlow.InputMeta.BOT_API_TOKEN);
        const deploymentId = this._userProperties.getProperty(SetupFlow.InputMeta.DEPLOYMENT_ID);
        return {
            // show 4 first and 4 last characters of the token
            botToken: token ? `${token.substring(0, 4)}****${token.substring(token.length - 4)}` : null,
            botTokenSet: !!this._userProperties.getProperty(SetupFlow.InputMeta.BOT_API_TOKEN),
            deploymentId: deploymentId?`${deploymentId.substring(0, 4)}****${deploymentId.substring(deploymentId.length - 4)}`:null,
            deploymentIdSet: !!this._userProperties.getProperty(SetupFlow.InputMeta.DEPLOYMENT_ID),
            webhookUrl: decodeURI(this.webhookUrl),
            webhookSet: !!this.webhookUrl,
            chatId: this._userProperties.getProperty(SetupFlow.InputMeta.ADMIN_CHAT_ID),
            chatIdSet: !!this._userProperties.getProperty(SetupFlow.InputMeta.ADMIN_CHAT_ID),
            defaultLanguage: this._userProperties.getProperty(SetupFlow.InputMeta.DEFAULT_LANGUAGE),
            defaultLanguageSet: !!this._userProperties.getProperty(SetupFlow.InputMeta.DEFAULT_LANGUAGE),
            debugMode: this._userProperties.getProperty(SetupFlow.InputMeta.DEBUG_MODE) === 'true',
            debugModeSet: this._userProperties.getProperty(SetupFlow.InputMeta.DEBUG_MODE) === 'true',
            activateSpreadsheetId: this._userProperties.getProperty(SetupFlow.InputMeta.ACTIVE_SPREADSHEET_ID),
            activateSpreadsheetIdSet: this._userProperties.getProperty(SetupFlow.InputMeta.ACTIVE_SPREADSHEET_ID) !== null
        }
    }

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

    get getWebhookInfoResult() {
        if (!this.telegramBotClient) {
            return null;
        }
        const response = this.telegramBotClient
            .getWebhookInfo();

        if (response.getResponseCode() !== 200) {
            return null;
        }
        return JSON.parse(response.getContentText())?.result || null;
    }

    get getMeResult() {
        if (!this.telegramBotClient) {
            return null;
        }
        const response = this.telegramBotClient
            .getMe();

        if (response.getResponseCode() !== 200) {
            return null;
        }
        return JSON.parse(response.getContentText())?.result || null;
    }
}

SetupFlow.InputMeta = {
    BOT_API_TOKEN: 'bot_api_token',
    DEPLOYMENT_ID: 'deployment_id',
    ADMIN_CHAT_ID: 'admin_chat_id',
    DEFAULT_LANGUAGE: 'default_language',
    DEBUG_MODE: 'debug_mode_set',
    ACTIVE_SPREADSHEET_ID: 'active_spreadsheet_id'
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SetupFlow };
}