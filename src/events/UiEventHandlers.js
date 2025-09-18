class UiEventHandlers {
    static back(e) {
        try {
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popCard())
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    }
    static handleError(error) {
        console.error('Error occurred:', error);
        // Show an error message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText('An error occurred: ' + error.message))
            .build();
    }
}

UiEventHandlers.Home = {
    openCreateNewBotCard: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory().build())
                .build()
                .navigateToCreateBot()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    openBotSettingsCard: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory().build())
                .build()
                .navigateToSettings()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    openBotRepliesCard: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory().build())
                .build()
                .navigateToAutomations()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    openDeploymentSettingsCard: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(
                    new UserStore())
                .build()
                .navigateToDeploymentSettings()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    saveDeploymentId: (e) => {
        try {
            const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
            if (!formInputs) {
                throw new Error("Form inputs are missing");
            }
            return BotControllerFactory.create()
                .withUserStore(
                    new UserStore())
                .build()
                .saveDeploymentSettings(e)
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    back: (e) => {
        return UiEventHandlers.back(e);
    }
};

UiEventHandlers.Bot = {
    saveNewBotToken: (e) => {
        try {
            const botToken = e?.commonEventObject
                ?.formInputs?.['BOT_TOKEN']
                ?.stringInputs.value[0] || '[YOUR_BOT_TOKEN]';

            //const client = new TelegramBotClient(botToken);

            return BotControllerFactory.create()
                .withUserStore(
                    new UserStore())
                //.withTelegramBotClient(client)
                .build()
                .registerBotToken(botToken)
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    saveMyBotInfo: (e) => {
        try {
            const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
            if (!formInputs) {
                throw new Error("Form inputs are missing");
            }

            return BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory().build())
                .build()
                .saveBotSettings(e)
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    setWebhook: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(new UserStore())
                .build()
                .setWebhook()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    deleteWebhook: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(
                    new UserStore())
                .build()
                .deleteWebhook()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    back: (e) => {
        return UiEventHandlers.back(e);
    }
};

UiEventHandlers.AutomationReplies = {
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UiEventHandlers };
}