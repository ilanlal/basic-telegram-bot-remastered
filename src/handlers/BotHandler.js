class BotHandler {
    get userProperties() {
        if (!this._userProperties) {
            this._userProperties = PropertiesService.getUserProperties();
        }
        return this._userProperties;
    }

    get activeSpreadsheet() {
        if (!this._activeSpreadsheet) {
            this._activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        return this._activeSpreadsheet;
    }

    constructor() {
        this._userProperties = null;
        this._activeSpreadsheet = null;
    }
};

BotHandler.Addon = {
    onIdentifyTokenClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .AddonWrapper(
                BotHandler.prototype.userProperties,
                BotHandler.prototype.activeSpreadsheet)
            .handleIdentifyTokenClick(e);
    },
    onWebhookManagementClick: (e) => {
        return new BotHandler
            .AddonWrapper(
                BotHandler.prototype.userProperties,
                BotHandler.prototype.activeSpreadsheet)
            .handleWebhookManagementClick(e);
    },
    onSetMyNameClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .AddonWrapper(
                BotHandler.prototype.userProperties,
                BotHandler.prototype.activeSpreadsheet)
            .handleSetMyNameClick(e);
    },
    onSetMyDescriptionClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .AddonWrapper(
                BotHandler.prototype.userProperties,
                BotHandler.prototype.activeSpreadsheet)
            .handleSetMyDescriptionClick(e);
    },
    onSetMyShortDescriptionClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .AddonWrapper(
                BotHandler.prototype.userProperties,
                BotHandler.prototype.activeSpreadsheet)
            .handleSetMyShortDescriptionClick(e);
    },
    onSetMyCommandsClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .AddonWrapper(
                BotHandler.prototype.userProperties,
                BotHandler.prototype.activeSpreadsheet)
            .handleSetMyCommandsClick(e);
    }
}

BotHandler.AddonWrapper = class {
    constructor(userProperties, activeSpreadsheet) {
        this._userProperties = userProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    handleIdentifyTokenClick(e) {
        try {
            let token = e.parameters?.token || null;
            if (!token) {
                const formInputs = e.commonEventObject.formInputs || {};
                token = formInputs['txt_bot_api_token']?.stringInputs?.value[0] || null;
            }

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            const result = controller.identifyNewBotToken(token);
            controller.setNewBotToken(token);

            return this.handleOperationSuccess("👍 Bot token identified successfully.")
                .build();

        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleWebhookManagementClick(e) {
        try {
            const action = e.parameters?.action || null;
            if (!action) {
                throw new Error("'action' parameter is required for webhook management.");
            }

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            if (action === 'setWebhook') {
                controller.setWebhook();
            } else if (action === 'deleteWebhook') {
                controller.deleteWebhook();
            }

            return this.handleOperationSuccess(`👍 Webhook ${action === 'setWebhook' ? 'set' : 'deleted'} successfully.`)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyNameClick(e) {
        try {
            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            const response = controller.setMyName();

            return this.handleOperationSuccess("👍 Bot name set successfully."
                + ` total: ${Object.keys(response.langs).length} languages.`)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyDescriptionClick(e) {
        try {
            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            const response = controller.setMyDescription();
            return this.handleOperationSuccess("👍 Bot description set successfully."
                + ` total: ${Object.keys(response.langs).length} languages.`)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyShortDescriptionClick(e) {
        try {
            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            const response = controller.setMyShortDescription();

            return this.handleOperationSuccess("👍 Bot short description set successfully."
                + ` total: ${Object.keys(response.langs).length} languages.`)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyCommandsClick(e) {
        try {
            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            const response = controller.setMyCommands();

            return this.handleOperationSuccess("👍 Bot commands set successfully."
                + ` total: ${Object.keys(response.langs).length} languages.`)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleOperationSuccess(message) {
        // Show a success message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(message));
    }

    handleError(error) {
        // Show an error message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()));
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BotHandler
    };
}