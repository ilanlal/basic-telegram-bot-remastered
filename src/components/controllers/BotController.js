class BotController {
    constructor() {
        this.localization = AppManager.getLocalizationResources();
        this.userInfo = ModelBuilder.newUserInfo()
            .setUserId('_user')
            .setUserLicense(ServiceBuilder.newUserStore().getUserLicense());
    }
    setLocalization(localization) {
        this.localization = localization;
        return this;
    }

    getLocalization() {
        return this.localization;
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo;
        return this;
    }

    getUserInfo() {
        return this.userInfo;
    }

    setUserStore(userStore) {
        this.userStore = userStore;
        return this;
    }

    getUserStore() {
        return this.userStore;
    }

    static newBotController(localization, userStore, userInfo) {
        return new BotController()
            .setLocalization(localization)
            .setUserStore(userStore)
            .setUserInfo(userInfo);
    }

    home() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        ViewBuilder.newBotHomeCard(
                            this.getLocalization(),
                            this.getUserInfo()
                        ).build()
                    )
            );
    }
}
