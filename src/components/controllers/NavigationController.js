class NavigationController {
    constructor(userStore) {
        this._userStore = userStore;
    }

    static create(userStore = new UserStore()) {
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
        const model = {
            BOT_TOKEN: ''
        };
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        NewBotTokenCard.create(model)
                            .build()
                    )
            );
    }

    navigateToNewDeploymentIdCard() {
        const model = {
            deploymentId: this._userStore.getDeploymentId() || '',
            environment: 'production'
        };
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(NewDeploymentIdCard.create(model)
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
            version: '1.0.0', // default version
            build: 'N/A' // default build
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

    navigateToSettingCard() {
        return this.navigateToAccountCard();
    }

    navigateToSetMyChatIdCard() {
        const model = {
            chatId: this._userStore.getMyChatId() || ''
        };
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        SetMyChatIdCard.create(model)
                            .build()
                    )
            );
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