class SetupFlow {
    constructor(userProperties, activeSpreadsheet) {
        this._userProperties = userProperties;
        this._telegramBotClient = null;
        this.sheetModel = SheetModel.create(activeSpreadsheet);
        this.sheet = this.sheetModel.initializeSheet(EMD.BotSetup.sheet({}));
    }

    static create(
        userProperties = PropertiesService.getUserProperties(),
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    ) {
        return new SetupFlow(userProperties, activeSpreadsheet);
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
        EnvironmentModel.create(this._userProperties)
            .setNewBotToken(safeToken);

        const contentText = response.getContentText();
        const res = JSON.parse(contentText);
        return res.result;
    }

    setWebhook() {
        const deploymentId = this._userProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID);
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
        const deploymentId = this._userProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID);
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

    setMyName({ name, language_code } = {}) {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error("Invalid bot name");
        }

        const response = this.telegramBotClient.setMyName(name, language_code);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot name");
        }
        return JSON.parse(response.getContentText());
    }

    setMyDescription({ description, language_code } = {}) {
        const response = this.telegramBotClient.setMyDescription(description, language_code);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot description");
        }
        return JSON.parse(response.getContentText());
    }

    setMyShortDescription({ short_description, language_code } = {}) {
        const response = this.telegramBotClient.setMyShortDescription(short_description, language_code);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot short description");
        }
        return JSON.parse(response.getContentText());
    }

    setMyCommands({ commands, language_code, scope } = {}) {
        const response = this.telegramBotClient.setMyCommands({ commands, language_code, scope });
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot commands");
        }
        return JSON.parse(response.getContentText());
    }

    // Getters
    get trafficLight() {
        const leds = '{0}{1}{2}';
        const led0 = this.stateObject.botTokenSet ? Lights.ON : Lights.OFF;
        const led1 = this.stateObject.deploymentIdSet ? Lights.ON : Lights.OFF;
        const led2 = this.stateObject.webhookSet ? Lights.ON : Lights.OFF;

        return leds
            .replace('{0}', led0)
            .replace('{1}', led1)
            .replace('{2}', led2);
    }

    get stateObject() {
        const token = this._userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
        const deploymentId = this._userProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID);
        return {
            // show 4 first and 4 last characters of the token
            botToken: token ? `${token.substring(0, 4)}****${token.substring(token.length - 4)}` : null,
            botTokenSet: !!this._userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN),
            deploymentId: deploymentId ? `${deploymentId.substring(0, 4)}****${deploymentId.substring(deploymentId.length - 4)}` : null,
            deploymentIdSet: !!this._userProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID),
            webhookUrl: decodeURI(this.webhookUrl),
            webhookSet: !!this.webhookUrl
        }
    }

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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SetupFlow };
}