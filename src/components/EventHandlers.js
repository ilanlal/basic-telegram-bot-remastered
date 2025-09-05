class EventHandlers {
    static back(e) {
        try {
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popCard())
                .build();
        } catch (error) {
            return EventHandlers.handleError(error);
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

EventHandlers.Home = {
    openCreateNewBotCard: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory().build())
                .build()
                .navigateToCreateBot()
                .build();
        } catch (error) {
            return EventHandlers.handleError(error);
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
            return EventHandlers.handleError(error);
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
            return EventHandlers.handleError(error);
        }
    }
};

EventHandlers.Bot = {
    saveNewBotToken: (e) => {
        try {
            const botToken = e?.commonEventObject
                ?.formInputs?.['BOT_TOKEN']
                ?.stringInputs.value[0] || '[YOUR_BOT_TOKEN]';

            const client = TelegramBotClientFactory
                .withToken(botToken)
                .build();

            return BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory().build())
                .withTelegramBotClient(client)
                .build()
                .registerBotToken(botToken)
                .build();
        } catch (error) {
            return EventHandlers.handleError(error);
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
            return EventHandlers.handleError(error);
        }
    },
    setWebhook: (e) => {
        try {
            return BotControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory().build())
                .build()
                .setWebhook(e)
                .build();
        } catch (error) {
            return EventHandlers.handleError(error);
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
            return EventHandlers.handleError(error);
        }
    },
    back: (e) => {
        return EventHandlers.back(e);
    }
};

EventHandlers.AutomationReplies = {
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EventHandlers };
}