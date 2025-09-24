class AddonHandler {
    constructor() {
        this._userStore = new UserStore();
    }

    handleOnHomePageOpen(e) {
        return BotControllerFactory.create()
            .withUserStore(this._userStore)
            .build()
            .navigateToHome()
            .build();
    }

    handleOnAccountCardOpen(e) {
        return AccountControllerFactory.create()
            .withUserStore(this._userStore)
            .build()
            .navigateToHome()
            .build();
    }

    handleOnAboutCardOpen(e) {
        return AboutControllerFactory.create()
            .withPackageInfo({
                name: "My Add-on",
                version: "1.0.0",
                author: "Your Name",
                build: "1.0.0",
                description: "This is my add-on"
            })
            .build()
            .navigateHome()
            .build();
    }

    static create() {
        return new AddonHandler();
    }
}

AddonHandler.Events = {
    onHomePageOpen: (event) => AddonHandler.create().handleOnHomePageOpen(event),
    onAccountCardOpen: (event) => AddonHandler.create().handleOnAccountCardOpen(event),
    onAboutCardOpen: (event) => AddonHandler.create().handleOnAboutCardOpen(event)
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AddonHandler
    };
}