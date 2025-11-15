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

    setMyName() {
        const model = BotModel.create(this.sheetModel.activeSpreadsheet);
        const langs = model.getLanguages()
            .map(({ lang }) => lang);

        langs.forEach((language_code) => {
            if (language_code === 'key') return; // skip key column
            if (language_code === '') return; // skip empty language code
            // get name value for the language
            const text = model.getValue('name', language_code);
            // skip empty texts
            if (!text || text.trim() === '') {
                return;
            }

            // set bot name
            let response;
            if (language_code === 'default') {
                response = this.telegramBotClient.setMyName({ name: text });
            } else {
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
        const model = BotModel.create(this.sheetModel.activeSpreadsheet);
        const langs = model.getLanguages().map(({ lang }) => lang);

        langs.forEach((language_code) => {
            if (language_code === 'key') return; // skip key column
            if (language_code === '') return; // skip empty language code
            // get description value for the language
            const text = model.getValue('description', language_code);
            // skip empty texts
            if (!text || text.trim() === '') {
                return;
            }

            // set bot name
            let response;
            if (language_code === 'default') {
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
        const model = BotModel.create(this.sheetModel.activeSpreadsheet);
        const langs = model.getLanguages().map(({ lang }) => lang);

        langs.forEach((language_code) => {
            if (language_code === 'key') return; // skip key column
            if (language_code === '') return; // skip empty language code
            // get short description value for the language
            const text = model.getValue('short_description', language_code);
            // skip empty texts
            if (!text || text.trim() === '') {
                return;
            }

            // set bot name
            let response;
            if (language_code === 'default') {
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
        const model = BotModel.create(this.sheetModel.activeSpreadsheet);
        const langs = model.getLanguages().map(({ lang }) => lang);

        langs.forEach((language_code) => {
            if (language_code === 'key') return; // skip key column
            if (language_code === '') return; // skip empty language code
            // get commands value for the language
            const text = model.getValue('commands', language_code);
            // skip empty texts
            if (!text || text.trim() === '') {
                return;
            }

            // set bot commands
            const commands = JSON.parse(text);
            let response;
            if (language_code === 'default') {
                response = this.telegramBotClient.setMyCommands({ commands });
            } else {
                response = this.telegramBotClient.setMyCommands({ commands, language_code });
            }

            // check response
            if (response.getResponseCode() !== 200) {
                throw new Error("Failed to set bot commands");
            }
        });
        return { langs };
    }

    // Getters
    get trafficLight() {
        const leds = '{0}{1}{2}';
        const led0 = this.state.botTokenSet ? Lights.ON : Lights.OFF;
        const led1 = this.state.deploymentIdSet ? Lights.ON : Lights.OFF;
        const led2 = this.state.webhookSet ? Lights.ON : Lights.OFF;

        return leds
            .replace('{0}', led0)
            .replace('{1}', led1)
            .replace('{2}', led2);
    }

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