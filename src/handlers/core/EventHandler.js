class EventHandler {
    get activeSpreadsheet() {
        if (!this._activeSpreadsheet) {
            this._activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        return this._activeSpreadsheet;
    }

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
        this._activeSpreadsheet = null;
        this._documentProperties = null;
        this._userProperties = null;
        this._scriptProperties = null;
    }
};

EventHandler.ViewModel = {
    onOpenHomeCard: (e) => {
        return NavigationHandler.ViewModel
            .onPushCardClick({ parameters: { template: 'EMD.Cards.Home' } });
    },
    onOpenAccountCard: (e) => {
        return NavigationHandler.ViewModel
            .onPushCardClick({ parameters: { template: 'EMD.Cards.Account' } });
    },
    onOpenAboutCard: (e) => {
        return NavigationHandler.ViewModel
            .onPushCardClick({ parameters: { template: 'EMD.Cards.About' } });
    },
    onOpenHelpCard: (e) => {
        return NavigationHandler.ViewModel
            .onPushCardClick({ parameters: { template: 'EMD.Cards.Help' } });
    },
    onActivatePremiumClicked: (e) => {
        throw new Error("Not implemented yet");
    },
    onRevokeLicenseClicked: (e) => {
        throw new Error("Not implemented yet");
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventHandler
    };
}