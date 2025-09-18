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
            const deploymentId = ScriptApp.getDeploymentId();
            if (!deploymentId) {
                throw new Error("Deployment ID is not available. Please deploy the script as a web app.");
            }
            const webhookUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
            const userStore = new UserStore();
            const botToken = userStore.getTelegramBotInfo()?.getBotToken();
            if (!botToken) {
                throw new Error("Bot token is not set. Please set the bot token first.");
            }
            
            //const client = new TelegramBotClient(botToken);

            return BotControllerFactory.create()
                .withUserStore(userStore)
                .build()
                .setWebhook(webhookUrl)
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    deleteWebhook: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory().build())
                .build()
                .deleteWebhook(e)
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