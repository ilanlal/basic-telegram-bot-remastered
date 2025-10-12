class NavigationController {
    constructor(userStore) {
        this._userStore = userStore;
    }

    static create(userStore = UserStoreFactory.create().current) {
        return new NavigationController(userStore);
    }

    navigateToHomeCard() {
        const setupFlow = SetupFlow.create(this._userStore);

        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        HomeCard.create(setupFlow)
                            .build()
                    )
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
        const setupFlow = SetupFlow.create(this._userStore);
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        BotSetupCard.create(setupFlow)
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