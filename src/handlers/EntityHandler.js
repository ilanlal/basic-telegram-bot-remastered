class EntityHandler {
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

EntityHandler.Addon = {
    onOpenCardClick: (e) => {
        return new EntityHandler
            .AddonWrapper(
                EntityHandler.prototype.userProperties)
            .handleOpenCard(e);
    },
    onBindSheetDataClick: (e) => {
        return new EntityHandler
            .AddonWrapper(
                EntityHandler.prototype.userProperties)
            .handleBindSheetData(e);
    },
    onToggleBooleanSetting: (e) => {
        return new EntityHandler
            .AddonWrapper(
                EntityHandler.prototype.userProperties)
            .handleToggleBooleanSetting(e);
    }
}

EntityHandler.AddonWrapper = class {
    constructor(userProperties) {
        this._userProperties = userProperties;
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
            const setupFlow = SetupFlow.create(this._userProperties);
            const environmentModel = EnvironmentModel.create(this._userProperties);
            
            return EntityController
                .create(
                    null,
                    CardService,
                    SpreadsheetApp.getActiveSpreadsheet(),
                    this._userProperties)
                .pushCard(emd.card({
                    isAdmin: false,
                    setupFlow: setupFlow.stateObject,
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
                    null,
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
        EntityHandler
    };
}