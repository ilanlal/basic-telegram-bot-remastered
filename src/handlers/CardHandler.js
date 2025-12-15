class CardHandler {
    get documentProperties() {
        if (!this._documentProperties) {
            this._documentProperties = PropertiesService.getDocumentProperties();
        }
        return this._documentProperties;
    }

    get userProperties() {
        if (!this._userProperties) {
            this._userProperties = PropertiesService.getUserProperties();
        }
        return this._userProperties;
    }

    get scriptProperties() {
        if (!this._scriptProperties) {
            this._scriptProperties = PropertiesService.getScriptProperties();
        }
        return this._scriptProperties;
    }

    constructor() {
        this._documentProperties = null;
        this._userProperties = null;
        this._scriptProperties = null;
    }
};

CardHandler.Addon = {
    onPushCardClick: (e) => {
        return new CardHandler
            .AddonWrapper(
                CardHandler.prototype.documentProperties)
            .handleOpenCard(e);
    },
    onPopCardClick: (e) => {
        return new CardHandler
            .AddonWrapper(
                CardHandler.prototype.documentProperties)
            .handleOpenCard(e);
    },
    onUpdateCardClick: (e) => {
        return new CardHandler
            .AddonWrapper(
                CardHandler.prototype.documentProperties)
            .handleOpenCard(e);
    },
    onPopToNamedCardClick: (e) => {
        return new CardHandler
            .AddonWrapper(
                CardHandler.prototype.documentProperties)
            .handleOpenCard(e);
    },
    onPopToRootCardClick: (e) => {
        return new CardHandler
            .AddonWrapper(
                CardHandler.prototype.documentProperties)
            .handleOpenCard(e);
    },
    onOpenCardClick: (e) => {
        return new CardHandler
            .AddonWrapper(
                CardHandler.prototype.documentProperties)
            .handleOpenCard(e);
    },
    onToggleBooleanSetting: (e) => {
        return new CardHandler
            .AddonWrapper(
                CardHandler.prototype.documentProperties)
            .handleToggleBooleanSetting(e);
    }
}

CardHandler.AddonWrapper = class {
    constructor(documentProperties, userProperties, scriptProperties) {
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
    }

    handleOpenCard(e) {
        try {
            // parameters: { card: 'EMD.Cards.Customer' }
            const cardParam = e.parameters?.card || null;

            if (!cardParam) {
                throw new Error("'card' parameter is required for onOpenCard.");
            }

            // EMD.Cards.Customer || Customer
            const emd_card = EMD.Cards[cardParam.split('.').pop()];
            if (!emd_card) {
                throw new Error(`Card configuration for '${cardParam}' not found in EMD.`);
            }


            const userInfo = {
                isPremium: false,
                isAdmin: false
            }
            const packageInfo = {
                version: Config.getVersion(),
                build: Config.getBuild(),
                author: Config.getAuthor(),
                license: Config.getLicense(),
                repository: Config.getRepository()
            };
            const setupFlow = SetupFlow.create(this._documentProperties);
            const environmentModel = EnvironmentModel.create(this._documentProperties);

            return CardController
                .create(
                    CardService,
                    SpreadsheetApp.getActiveSpreadsheet(),
                    this._documentProperties)
                .pushCard(emd_card({
                    isAdmin: false,
                    setupFlow: setupFlow.state,
                    environmentVariables: environmentModel.state,
                    getMeResult: setupFlow.getMeResult,
                    getWebhookInfoResult: setupFlow.getWebhookInfoResult,
                    packageInfo: packageInfo,
                    userInfo: userInfo
                }))
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
        CardHandler
    };
}