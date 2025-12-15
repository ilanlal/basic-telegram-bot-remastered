class SetupFlow {
    constructor(userProperties, activeSpreadsheet) {
        this._userProperties = userProperties;
        this._telegramBotClient = null;
        this._activeSpreadsheet = activeSpreadsheet;
        this.sheetModel = SheetModel.create(activeSpreadsheet);
        this.sheet = this.sheetModel.initializeSheet(EMD.Spreadsheet.BotSetup({}));
    }

    static create(
        userProperties = PropertiesService.getDocumentProperties(),
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

    setTestWebhook() {
        const deploymentId = this._userProperties
            .getProperty(EnvironmentModel.InputMeta.TEST_DEPLOYMENT_ID);
        if (!deploymentId) {
            throw new Error("Test Deployment ID is not available. Please deploy the script as a web app.");
        }
        const webhookUrl = `https://script.google.com/macros/s/${deploymentId}/dev`;

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

    setMyName() {
        const model = BotModel.create(this._activeSpreadsheet);
        const langs = model.getLanguages().map(({ lang }) => lang);

        langs.forEach((language_code) => {
            // get name value for the language
            const text = model.getValue('name', language_code);
            // skip empty texts
            if (!text || text.trim() === '') {
                throw new Error(`Name for language "${language_code}" is empty`);
            }

            let response = null;
            if (language_code === 'default' || language_code === '') {
                // set default name
                response = this.telegramBotClient.setMyName({ name: text });
            } else {
                // set bot name for specific language
                response = this.telegramBotClient.setMyName({ name: text, language_code });
            }

            // check response
            if (response.getResponseCode() !== 200) {
                throw new Error("Failed to set bot name");
            }
        });
        return { langs };
    }

    setMyDescription() {
        const model = BotModel.create(this._activeSpreadsheet);
        const langs = model.getLanguages().map(({ lang }) => lang);

        langs.forEach((language_code) => {
            // get description value for the language
            const text = model.getValue('description', language_code);
            // skip empty texts
            if (!text || text.trim() === '') {
                throw new Error(`Description for language "${language_code}" is empty`);
            }

            let response = null;
            // set bot name
            if (language_code === 'default' || language_code === '') {
                response = this.telegramBotClient.setMyDescription({ description: text });
            } else {
                response = this.telegramBotClient.setMyDescription({ description: text, language_code });
            }

            // check response
            if (response.getResponseCode() !== 200) {
                throw new Error("Failed to set bot description");
            }
        });
        return { langs };
    }

    setMyShortDescription() {
        const model = BotModel.create(this._activeSpreadsheet);
        const langs = model.getLanguages().map(({ lang }) => lang);

        langs.forEach((language_code) => {
            // get short description value for the language
            const text = model.getValue('short_description', language_code);
            // skip empty texts
            if (!text || text.trim() === '') {
                throw new Error(`Short description for language "${language_code}" is empty`);
            }

            let response = null;
            // set bot short description
            if (language_code === 'default' || language_code === '') {
                response = this.telegramBotClient.setMyShortDescription({ short_description: text });
            } else {
                response = this.telegramBotClient.setMyShortDescription({ short_description: text, language_code });
            }

            // check response
            if (response.getResponseCode() !== 200) {
                throw new Error("Failed to set bot short description");
            }
        });
        return { langs };
    }

    setMyCommands() {
        const model = BotModel.create(this._activeSpreadsheet);
        const langs = model.getLanguages().map(({ lang }) => lang);

        langs.forEach((language_code) => {
            // get commands value for the language
            const text = model.getValue('commands', language_code);
            // skip empty texts
            if (!text || text.trim() === '') {
                throw new Error(`key "commands" for language "${language_code}" are empty`);
            }

            // set bot commands
            const parsedCommands = JSON.parse(text);
            let response = null;
            if (language_code === 'default' || language_code === '') {
                response = this.telegramBotClient.setMyCommands({ commands: parsedCommands });
            } else {
                response = this.telegramBotClient.setMyCommands({ commands: parsedCommands, language_code });
            }
            // check response
            if (response.getResponseCode() !== 200) {
                throw new Error("Failed to set bot commands");
            }
        });
        return { langs };
    }

    // Getters
    get state() {
        const token = this._userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
        const deploymentId = this._userProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID);
        const _webhookUrl = this.webhookUrl;
        return {
            // show 4 first and 4 last characters of the token
            botToken: token ? `${token.substring(0, 4)}****${token.substring(token.length - 4)}` : null,
            botTokenSet: !!this._userProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN),
            deploymentId: deploymentId ? `${deploymentId.substring(0, 4)}****${deploymentId.substring(deploymentId.length - 4)}` : null,
            deploymentIdSet: !!this._userProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID),
            webhookUrl: decodeURI(_webhookUrl),
            webhookSet: !!_webhookUrl
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