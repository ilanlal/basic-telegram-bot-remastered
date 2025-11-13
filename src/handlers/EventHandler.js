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
    onSetMyNameClick: (e) => {
        // Not implemented yet
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleSetMyNameClick(e);
    },
    onSetMyDescriptionClick: (e) => {
        // Not implemented yet
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleSetMyDescriptionClick(e);
    },
    onSetMyShortDescriptionClick: (e) => {
        // Not implemented yet
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleSetMyShortDescriptionClick(e);
    },
    onSetMyCommandsClick: (e) => {
        // Not implemented yet
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userStore,
                EventHandler.prototype.userProperties)
            .handleSetMyCommandsClick(e);
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
            return EntityHandler.Addon
                .onOpenCardClick({ parameters: { entityName: 'Home' } });
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
                        setupFlow: setupFlow.stateObject,
                        getMeResult: setupFlow.getMeResult,
                        getWebhookInfoResult: setupFlow.getWebhookInfoResult
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

    handleSaveBotSetupClick(e) {
        try {
            throw new Error("Not implemented yet");
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyNameClick(e) {
        try {
            throw new Error("Not implemented yet");
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyDescriptionClick(e) {
        try {
            throw new Error("Not implemented yet");
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyShortDescriptionClick(e) {
        try {
            throw new Error("Not implemented yet");
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