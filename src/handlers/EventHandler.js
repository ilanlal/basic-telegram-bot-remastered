class EventHandler {
    get userStore() {
        if (!this._userStore) {
            this._userStore = UserStoreFactory.create().current;
        }
        return this._userStore;
    }

    constructor() {
        this._userStore = null;
    }
};

EventHandler.Addon = {
    onOpenHomeCard: (e) => {
        return new EventHandler.AddonWrapper(EventHandler.prototype.userStore)
            .handleOpenHomeCard(e);
    },
    onOpenAccountCard: (e) => {
        return new EventHandler.AddonWrapper(EventHandler.prototype.userStore)
            .handleOpenAccountCard(e);
    },
    onOpenAboutCard: (e) => {
        return new EventHandler.AddonWrapper(EventHandler.prototype.userStore)
            .handleOpenAboutCard(e);
    },
    onActivatePremiumClicked: (e) => {
        return new EventHandler.AddonWrapper(EventHandler.prototype.userStore)
            .handleActivatePremiumClicked(e);
    },
    onRevokeLicenseClicked: (e) => {
        return new EventHandler.AddonWrapper(EventHandler.prototype.userStore)
            .handleRevokeLicenseClicked(e);
    },
    onOpenSettingsCard: (e) => {
        return new EventHandler.AddonWrapper(EventHandler.prototype.userStore)
            .handleOpenSettingsCard(e);
    },
    onSaveSettingsClicked: (e) => {
        return new EventHandler.AddonWrapper(EventHandler.prototype.userStore)
            .handleSaveSettings(e);
    },
    onToggleBooleanSetting: (e) => {
        return new EventHandler.AddonWrapper(EventHandler.prototype.userStore)
            .handleToggleBooleanSetting(e);
    }
}
EventHandler.AddonWrapper = class {
    constructor(userStore) {
        if (!(userStore instanceof UserStore)) {
            throw new Error("userStore must be an instance of UserStore");
        }
        this._userStore = userStore;
    }

    handleOpenHomeCard(e) {
        try {
            const params = [];
            return EntityController.create(this._userStore, CardService, SpreadsheetApp.getActiveSpreadsheet())
                .pushCard(EMD.Home.cardMeta, params)
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