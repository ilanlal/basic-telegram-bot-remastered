class EnvironmentHandler {
    get userProperties() {
        if (!this._userProperties) {
            this._userProperties = PropertiesService.getDocumentProperties();
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

EnvironmentHandler.Addon = {
    onSaveDeploymentIdClick: (e) => {
        return new EnvironmentHandler
            .AddonWrapper(
                EnvironmentHandler.prototype.userProperties)
            .handleSaveDeploymentIdClick(e);

    },
    onSaveAdminChatIdClick: (e) => {
        return new EnvironmentHandler
            .AddonWrapper(
                EnvironmentHandler.prototype.userProperties)
            .handleSaveAdminChatId(e);

    },
    onIdentifyActiveSpreadsheetIdClick: (e) => {
        // Not implemented yet
        return new EnvironmentHandler
            .AddonWrapper(
                EnvironmentHandler.prototype.userProperties)
            .handleIdentifyActiveSpreadsheetId(e);
    },
    onSaveDefaultLanguageClick: (e) => {
        return new EnvironmentHandler
            .AddonWrapper(
                EnvironmentHandler.prototype.userProperties)
            .handleSaveDefaultLanguage(e);
    },
    onSaveLogEventsClick: (e) => {
        // Not implemented yet
        return new EnvironmentHandler
            .AddonWrapper(
                EnvironmentHandler.prototype.userProperties)
            .handleSaveLogEvents(e);
    },
    onSetMyEnvironmentClick: (e) => {
        // Not implemented yet
        return new EnvironmentHandler
            .AddonWrapper(
                EnvironmentHandler.prototype.userProperties,
                EnvironmentHandler.prototype.activeSpreadsheet)
            .handleSetMyEnvironmentClick(e);
    },
    onSetWebhookCallbackUrlClick: (e) => {
        // Not implemented yet
        return new EnvironmentHandler
            .AddonWrapper(
                EnvironmentHandler.prototype.userProperties,
                EnvironmentHandler.prototype.activeSpreadsheet
            )
            .handleSetWebhookCallbackUrlClick(e);
    },
    onSetTestDeploymentIdClick: (e) => {
        // Not implemented yet
        return new EnvironmentHandler
            .AddonWrapper(
                EnvironmentHandler.prototype.userProperties,
                EnvironmentHandler.prototype.activeSpreadsheet)
            .handleSetTestDeploymentIdClick(e);
    }
}
EnvironmentHandler.AddonWrapper = class {
    constructor(userProperties, activeSpreadsheet) {
        this._userProperties = userProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    handleSaveDeploymentIdClick(e) {
        try {
            let deploymentId = e.parameters?.deploymentId || null;
            if (!deploymentId) {
                const formInputs = e.commonEventObject.formInputs || {};
                deploymentId = formInputs['txt_deployment_id']?.stringInputs?.value[0] || null;
            }
            let testDeploymentId = e.parameters?.testDeploymentId || null;
            if (!testDeploymentId) {
                const formInputs = e.commonEventObject.formInputs || {};
                testDeploymentId = formInputs['txt_test_deployment_id']?.stringInputs?.value[0] || null;
            }

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            controller.setNewDeploymentId(deploymentId);
            controller.setNewTestDeploymentId(testDeploymentId);

            return this.handleOperationSuccess("👍 Deployment ID identified successfully.")
                .build();

        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSaveAdminChatId(e) {
        try {
            let chatId = e.parameters?.chatId || null;

            if (!chatId) {
                const formInputs = e.commonEventObject.formInputs || {};
                chatId = formInputs['txt_admin_chat_id']?.stringInputs?.value[0] || null;
            }

            if (!chatId) {
                throw new Error("Chat ID is required.");
            }

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            controller.setNewChatId(chatId);

            return this.handleOperationSuccess("👍 Admin Chat ID saved successfully.")
                .build();

        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleIdentifyActiveSpreadsheetId(e) {
        try {
            let spreadsheetId = e.parameters?.spreadsheetId || null;

            if (!spreadsheetId) {
                const formInputs = e.commonEventObject.formInputs || {};
                spreadsheetId = formInputs['txt_active_spreadsheet_id']?.stringInputs?.value[0] || null;
            }

            if (!spreadsheetId) {
                throw new Error("Spreadsheet ID is required.");
            }

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            controller.setNewActiveSpreadsheetId(spreadsheetId);

            return this.handleOperationSuccess("👍 Active Spreadsheet ID saved successfully.")
                .build();

        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSaveDefaultLanguage(e) {
        try {
            let languageCode = e.parameters?.languageCode || null;

            if (!languageCode) {
                const formInputs = e.commonEventObject.formInputs || {};
                languageCode = formInputs['txt_default_language']?.stringInputs?.value[0] || null;
            }

            if (!languageCode) {
                throw new Error("Language code is required.");
            }

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            controller.setNewDefaultLanguage(languageCode);

            return this.handleOperationSuccess("👍 Default language saved successfully.")
                .build();

        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSaveLogEvents(e) {
        try {
            let logEvents = e.parameters.txt_log_events || null;
            if (!logEvents) {
                const formInputs = e.commonEventObject.formInputs || {};
                logEvents = formInputs['txt_log_events']?.stringInputs?.value[0] || null;
            }

            let log_archive = e.parameters.txt_log_archive || null;
            if (!log_archive) {
                const formInputs = e.commonEventObject.formInputs || {};
                log_archive = formInputs['txt_log_archive']?.stringInputs?.value[0] || null;
            }

            if (!logEvents) {
                logEvents = 'false';
            }

            if(!log_archive) {
                log_archive = '1000';
            }

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            controller.setDebugMode(logEvents === 'true');
            controller.setLogArchiveSize(parseInt(log_archive, 10));

            return this.handleOperationSuccess("👍 Log events setting saved successfully.")
                .build();

        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyEnvironmentClick(e) {
        try {
            let environment = e.parameters?.environment || 'exec';

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            const response = controller.setMyEnvironment(environment);

            return this.handleOperationSuccess("👍 Bot environment set successfully."
                + ` total: ${Object.keys(response.langs).length} languages.`)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetWebhookCallbackUrlClick(e) {
        try {
            let url = e.parameters?.url || null;

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            const response = controller.setWebhookCallbackUrl(url);

            return this.handleOperationSuccess("👍 Webhook callback URL set successfully.")
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetTestDeploymentIdClick(e) {
        try {
            let id = e.parameters?.id || null;

            const controller = BotSetupController
                .create(this._userProperties, this._activeSpreadsheet);

            const response = controller.setNewTestDeploymentId(id);

            return this.handleOperationSuccess("👍 Test deployment ID set successfully.")
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
        EnvironmentHandler
    };
}