class EnvironmentModel {
    constructor(userProperties) {
        this._userProperties = userProperties;
        this._telegramBotClient = null;

    }

    static create(
        userProperties = PropertiesService.getUserProperties()
    ) {
        return new EnvironmentModel(userProperties);
    }

    setNewDefaultLanguage(code) {
        if (!code || typeof code !== 'string' || code.trim() === '') {
            throw new Error("Invalid language code");
        }
        return this._userProperties.setProperty(EnvironmentModel.InputMeta.DEFAULT_LANGUAGE, code);
    }

    setNewBotToken(token) {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error("Invalid bot token");
        }
        const safeToken = decodeURIComponent(token);
        return this._userProperties.setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, safeToken);
    }

    setNewDeploymentId(id) {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error("Invalid deployment ID");
        }

        const safeId = decodeURIComponent(id);
        return this._userProperties.setProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID, safeId);
    }

    setMyNewChatId(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid chat ID");
        }
        const safeId = decodeURIComponent(id);
        return this._userProperties.setProperty(EnvironmentModel.InputMeta.ADMIN_CHAT_ID, safeId);
    }

    setDebugMode(isDebug) {
        const debugValue = isDebug ? 'true' : 'false';
        return this._userProperties.setProperty(EnvironmentModel.InputMeta.DEBUG_MODE, debugValue);
    }

    setNewActiveSpreadsheetId(spreadsheetId) {
        if (!spreadsheetId || typeof spreadsheetId !== 'string' || spreadsheetId.trim() === '') {
            spreadsheetId = '[current]';
        }

        const safeId = decodeURIComponent(spreadsheetId);
        return this._userProperties.setProperty(EnvironmentModel.InputMeta.ACTIVE_SPREADSHEET_ID, safeId);
    }

    // Getters
    get trafficLight() {
        const leds = '{0}{1}{2}{3}{4}';
        const led0 = this.state.botTokenSet ? Lights.ON : Lights.OFF;
        const led1 = this.state.deploymentIdSet ? Lights.ON : Lights.OFF;
        const led3 = this.state.chatIdSet ? Lights.ON : Lights.OFF;
        const led4 = this.state.defaultLanguageSet ? Lights.ON : Lights.WARN;
        const led5 = this.state.debugModeSet ? Lights.ON : Lights.OFF;

        return leds
            .replace('{0}', led0)
            .replace('{1}', led1)
            .replace('{2}', led2)
            .replace('{3}', led3)
            .replace('{4}', led4);
    }

    get state() {
        const token = this._userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
        const deploymentId = this._userProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID);
        return {
            // show 4 first and 4 last characters of the token
            botToken: token ? `${token.substring(0, 4)}****${token.substring(token.length - 4)}` : null,
            botTokenSet: !!this._userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN),
            deploymentId: deploymentId ? `${deploymentId.substring(0, 4)}****${deploymentId.substring(deploymentId.length - 4)}` : null,
            deploymentIdSet: !!this._userProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID),
            chatId: this._userProperties.getProperty(EnvironmentModel.InputMeta.ADMIN_CHAT_ID),
            chatIdSet: !!this._userProperties.getProperty(EnvironmentModel.InputMeta.ADMIN_CHAT_ID),
            defaultLanguage: this._userProperties.getProperty(EnvironmentModel.InputMeta.DEFAULT_LANGUAGE),
            defaultLanguageSet: !!this._userProperties.getProperty(EnvironmentModel.InputMeta.DEFAULT_LANGUAGE),
            debugMode: this._userProperties.getProperty(EnvironmentModel.InputMeta.DEBUG_MODE) === 'true',
            debugModeSet: this._userProperties.getProperty(EnvironmentModel.InputMeta.DEBUG_MODE) === 'true',
            activateSpreadsheetId: this._userProperties.getProperty(EnvironmentModel.InputMeta.ACTIVE_SPREADSHEET_ID),
            activateSpreadsheetIdSet: this._userProperties.getProperty(EnvironmentModel.InputMeta.ACTIVE_SPREADSHEET_ID) !== null
        }
    }
}

EnvironmentModel.InputMeta = {
    BOT_API_TOKEN: 'bot_api_token',
    DEPLOYMENT_ID: 'deployment_id',
    ADMIN_CHAT_ID: 'admin_chat_id',
    DEFAULT_LANGUAGE: 'default_language',
    DEBUG_MODE: 'debug_mode_set',
    ACTIVE_SPREADSHEET_ID: 'active_spreadsheet_id'
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnvironmentModel };
}