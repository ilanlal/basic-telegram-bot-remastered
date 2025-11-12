class EventHandler {
    get userStore() {
        if (!this._userStore) {
            this._userStore = UserStoreFactory.create().current;
        }
        return this._userStore;
    }

    get userProperties() {
        if (!this._userProperties) {
            this._userProperties = PropertiesService.getUserProperties();
        }
        return this._userProperties;
    }

    constructor() {
        this._userStore = null;
        this._userProperties = null;
    }
};

EventHandler.Addon = {
    onOpenHomeCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleOpenHomeCard(e);
    },
    onOpenCardClick: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleOpenCard(e);
    },
    onBindSheetDataClick: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleBindSheetData(e);
    },
    onOpenAccountCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleOpenAccountCard(e);
    },
    onOpenAboutCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleOpenAboutCard(e);
    },
    onActivatePremiumClicked: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleActivatePremiumClicked(e);
    },
    onRevokeLicenseClicked: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleRevokeLicenseClicked(e);
    },
    onOpenSettingsCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleOpenSettingsCard(e);
    },
    onSaveSettingsClicked: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleSaveSettings(e);
    },
    onToggleBooleanSetting: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleToggleBooleanSetting(e);
    },
    onBotSetupClick: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleBotSetupClick(e);
    },
    onWebhookManagementClick: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleWebhookManagementClick(e);
    },
    onIdentifyTokenClick: (e) => {
        // Not implemented yet
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleIdentifyTokenClick(e);
    },
    onIdentifyDeploymentIdClick: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleIdentifyDeploymentIdClick(e);

    },
    onSaveAdminChatIdClick: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleSaveAdminChatId(e);

    },
    onSaveBotSetupClick: (e) => {
        // Not implemented yet
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleSaveBotSetupClick(e);
    }
}
EventHandler.AddonWrapper = class {
    constructor(userStore, userProperties) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }
        this._userStore = userStore;
        this._userProperties = userProperties;
    }

    handleOpenHomeCard(e) {
        try {
            return this.handleOpenCard({ parameters: { entityName: 'Home' } });
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleOpenCard(e) {
        try {
            const entityName = e.parameters?.entityName || null;
            if (!entityName) {
                throw new Error("'entityName' parameter is required for onOpenCard.");
            }

            // find EMD card navigation based on entityName
            const emd = Object.values(EMD).find(emd => emd.entityName === entityName);
            if (!emd || !emd.card) {
                throw new Error(`No card found for entityName: ${entityName}`);
            }

            return EntityController
                .create(
                    this._userStore,
                    CardService,
                    SpreadsheetApp.getActiveSpreadsheet(),
                    this._userProperties)
                .pushCard(emd.card({ isAdmin: false }))
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleBindSheetData(e) {
        try {
            const entityName = e.parameters?.entityName || null;
            if (!entityName) {
                throw new Error("'entityName' parameter is required for onOpenCard.");
            }

            // find EMD card navigation based on entityName
            const emd = Object.values(EMD).find(emd => emd.entityName === entityName);
            if (!emd || !emd.sheet) {
                throw new Error(`Static method "sheet: (data={}) {}" not found for entityName: ${entityName}`);
            }

            const rs = EntityController
                .create(
                    this._userStore,
                    CardService,
                    SpreadsheetApp.getActiveSpreadsheet(),
                    this._userProperties)
                .bindSheetSampleData(emd.sheet({}));

            return this.handleOperationSuccess(`👍 Sheet data for ${entityName} bound successfully.`)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleOpenAccountCard(e) {
        try {
            return NavigationController.create(this._userStore)
                .navigateToAccountCard()
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleOpenAboutCard(e) {
        try {
            return NavigationController.create(this._userStore)
                .navigateToAboutCard()
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleActivatePremiumClicked(e) {
        try {
            return AccountController.create(this._userStore)
                .activatePremium(e)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleRevokeLicenseClicked(e) {
        try {
            return AccountController.create(this._userStore)
                .revokePremium(e)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleOpenSettingsCard(e) {
        try {
            return NavigationController.create(this._userStore)
                .navigateToSettingsCard()
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSaveSettings(e) {
        try {
            return SettingsController.create(this._userStore)
                .saveSettings(e)
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleToggleBooleanSetting(e) {
        try {
            throw new Error("Not implemented yet");
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleBotSetupClick(e) {
        try {
            const setupFlow = SetupFlow.create(this._userProperties);

            return EntityController
                .create(
                    this._userStore,
                    CardService,
                    SpreadsheetApp.getActiveSpreadsheet(),
                    this._userProperties)
                .pushCard(EMD.BotSetup.card(
                    {
                        isActive: setupFlow.stateObject.botTokenSet,
                        isAdmin: false,
                        setupFlow: setupFlow.stateObject
                    }
                ))
                .build();
        } catch (error) {
            console.error(error);
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
                .create(PropertiesService.getUserProperties());

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

    handleIdentifyTokenClick(e) {
        try {
            let token = e.parameters?.token || null;
            if (!token) {
                const formInputs = e.commonEventObject.formInputs || {};
                token = formInputs['txt_bot_api_token']?.stringInputs?.value[0] || null;
            }

            const controller = BotSetupController
                .create(PropertiesService.getUserProperties());

            const result = controller.identifyNewBotToken(token);
            controller.setNewBotToken(token);

            return this.handleOperationSuccess("👍 Bot token identified successfully.")
                .build();

        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleIdentifyDeploymentIdClick(e) {
        try {
            let deploymentId = e.parameters?.deploymentId || null;

            if (!deploymentId) {
                const formInputs = e.commonEventObject.formInputs || {};
                deploymentId = formInputs['txt_deployment_id']?.stringInputs?.value[0] || null;
            }
            const controller = BotSetupController
                .create(PropertiesService.getUserProperties());

            controller.setNewDeploymentId(deploymentId);

            return this.handleOperationSuccess("👍 Deployment ID identified successfully.")
                .build();

        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSaveBotSetupClick(e) {
        try {
            throw new Error("Not implemented yet");
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
                .create(this._userProperties);

            controller.setNewChatId(chatId);

            return this.handleOperationSuccess("👍 Admin Chat ID saved successfully.")
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
        EventHandler
    };
}