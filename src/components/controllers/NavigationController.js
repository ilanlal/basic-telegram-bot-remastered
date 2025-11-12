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

    navigateToHomeCard() {
        const setupFlow = SetupFlow.create(this._userProperties);
        const entityController = EntityController.create(
            this._userStore,
            this._cardService,
            this._spreadsheet,
            this._userProperties
        );
        return entityController.pushCard(
            EMD.Home.card({
                isActive: setupFlow.stateObject.botTokenSet,
                isAdmin: false,
                isPremium: false,
                isTrial: false,
                trialDaysLeft: 0,
                walletBalance: 0,
                hasAutomations: false,
                emojiSets: Lights.ON,
                setupFlow: setupFlow.stateObject
            })
        );
    }

    navigateToNewBotTokenCard() {
        const setupFlow = SetupFlow.create(this._userStore);

        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        NewBotTokenCard.create(setupFlow)
                            .build()
                    )
            );
    }

    navigateToUsersManagementCard() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new UsersManagementCard()
                            .build()
                    )
            );
    }

    navigateToAutomationCard() {
        // Placeholder for future implementation
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        BotAutomationsCard
                            .create({})
                            .build()
                    )
            );
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

    navigateToSettingsCard() {
        // load settings from user properties
        const settingsModel = Settings.create().load();
        return CardService.newActionResponseBuilder()
            .setNavigation(CardService
                .newNavigation()
                .pushCard(SettingsCard.create(settingsModel)
                    .build()));
    }

    navigateToBotSetupCard() {
        const setupFlow = SetupFlow.create(this._userProperties);
        const entityController = EntityController.create(
            this._userStore,
            this._cardService,
            this._spreadsheet,
            this._userProperties
        );
        return entityController.pushCard(
            EMD.BotSetup.card({
                isActive: setupFlow.stateObject.botTokenSet,
                isAdmin: false
            })
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