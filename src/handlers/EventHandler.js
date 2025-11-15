class EventHandler {
    get userProperties() {
        if (!this._userProperties) {
            this._userProperties = PropertiesService.getUserProperties();
        }
        return this._userProperties;
    }

    constructor() {
        this._userProperties = null;
    }
};

EventHandler.Addon = {
    onOpenHomeCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userProperties)
            .handleOpenHomeCard(e);
    },
    onBindSheetDataClick: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userProperties)
            .handleBindSheetData(e);
    },
    onOpenAccountCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userProperties)
            .handleOpenAccountCard(e);
    },
    onOpenAboutCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userProperties)
            .handleOpenAboutCard(e);
    },
    onActivatePremiumClicked: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userProperties)
            .handleActivatePremiumClicked(e);
    },
    onRevokeLicenseClicked: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userProperties)
            .handleRevokeLicenseClicked(e);
    },
    onBotSetupClick: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.userProperties)
            .handleBotSetupClick(e);
    }
}
EventHandler.AddonWrapper = class {
    constructor(userProperties) {
        this._userProperties = userProperties;
    }

    handleOpenHomeCard(e) {
        return EntityHandler.Addon
                .onOpenCardClick({ parameters: { entityName: 'Home' } });
    }

    handleOpenAccountCard(e) {
        return EntityHandler.Addon
                .onOpenCardClick({ parameters: { entityName: 'Account' } });
    }

    handleOpenAboutCard(e) {
        return EntityHandler.Addon
                .onOpenCardClick({ parameters: { entityName: 'About' } });
    }

    handleActivatePremiumClicked(e) {
        try {
            // return "Not implemented yet" error
            throw new Error("Not implemented yet");
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleRevokeLicenseClicked(e) {
        try {
            // return "Not implemented yet" error
            throw new Error("Not implemented yet");
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleBotSetupClick(e) {
        try {
            const setupFlow = SetupFlow.create(this._userProperties);
            const environmentModel = EnvironmentModel.create(this._userProperties);
            return EntityController
                .create(
                    CardService,
                    SpreadsheetApp.getActiveSpreadsheet(),
                    this._userProperties)
                .pushCard(EMD.BotSetup.card(
                    {
                        isAdmin: false,
                        environmentVariables: environmentModel.state,
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