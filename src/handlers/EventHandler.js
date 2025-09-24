class EventHandler {
    constructor() {
        this._userStore = new UserStore();
    }

    handleOnOpenHomeCard(e) {
        return BotControllerFactory.create()
            .withUserStore(this._userStore)
            .build()
            .navigateToHome()
            .build();
    }

    handleOnOpenAccountCard(e) {
        return AccountControllerFactory.create()
            .withUserStore(this._userStore)
            .build()
            .navigateToHome()
            .build();
    }

    handleOnOpenAboutCard(e) {
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

    handleOnActivatePremium(e) {
        try {
            return AccountControllerFactory.create()
                .withUserStore(
                    this._userStore)
                .build()
                .activatePremium(e)
                .build();
        } catch (error) {
            console.error("Error in onActivatePremium:", error);
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(
                            error.toString()))
                .build();
        }
    }

    handleOnRevokeLicense(e) {
        try {
            return AccountControllerFactory.create()
                .withUserStore(
                    this._userStore)
                .build()
                .revokePremium(e)
                .build();
        } catch (error) {
            console.error("Error in onRevokeLicense:", error);
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(
                            error.toString()))
                .build();
        }
    }

    withUserStore(userStore) {
        this._userStore = userStore;
        return this;
    }

    static create() {
        return new EventHandler();
    }
}

EventHandler.Addon = {
    onOpenHomeCard: (e) => RootController.create(new UserStore())
        .navigateToHome()
        .build(),
    onOpenAccountCard: (e) => EventHandler.create().handleOnOpenAccountCard(e),
    onOpenAboutCard: (e) => EventHandler.create().handleOnOpenAboutCard(e),
    onActivatePremium: (e) => EventHandler.create().handleOnActivatePremium(e),
    onRevokeLicense: (e) => EventHandler.create().handleOnRevokeLicense(e),
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventHandler
    };
}