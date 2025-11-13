class NavigationController {
    constructor(userStore, cardService, spreadsheet, userProperties) {
        this._userStore = userStore;
        this._cardService = cardService;
        this._spreadsheet = spreadsheet;
        this._userProperties = userProperties;
    }

    static create(
        userStore = UserStoreFactory.create().current,
        cardService = CardService,
        spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        userProperties = PropertiesService.getUserProperties()
    ) {
        return new NavigationController(userStore,
            cardService, spreadsheet, userProperties);
    }


    navigateToAboutCard() {
        // package.json is not accessible in GAS environment
        const packageInfo = {
            version: Config.getVersion(),
            build: Config.getBuild(),
            author: Config.getAuthor(),
            license: Config.getLicense(),
            repository: Config.getRepository()
        };

        return CardService.newActionResponseBuilder()
            .setNavigation(CardService
                .newNavigation()
                .pushCard(AboutCard.create({ packageInfo })
                    .build()));
    }

    navigateToAccountCard() {
        const model = {
            FREE_ACTIVATION_DAYS: 7,
            userInfo: this._userStore.getUserInfo()
        };
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        AccountCard.create(model)
                            .build()
                    )
            );
    }

    reload() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        HomeCard.create(
                            SetupFlow.create(this._userStore)
                        ).build()
                    ));
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationController
    };
}