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
            return NavigationController
                .create(new UserStore())
                .navigateToNewBotTokenCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    openBotSettingsCard: (e) => {
        try {
            return NavigationController
                .create(new UserStore())
                .navigateToSettingCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    openBotRepliesCard: (e) => {
        try {
            return NavigationController
                .create(new UserStore())
                .navigateToAutomationCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    openDeploymentSettingsCard: (e) => {
        try {
            return NavigationController
                .create(new UserStore())
                .navigateToNewDeploymentIdCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    openUsersManagementCard: (e) => {
        try {
            return NavigationController
                .create(new UserStore())
                .navigateToUsersManagementCard()
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
            return BotController.create(this._userStore)
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

            const response = BotController.create(this._userStore)
                .registerBotToken(botToken);

            return NavigationController.create(this._userStore)
                .reload()
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

            return BotController.create(this._userStore)
                .saveBotSettings(e);
        } catch (error) {
            throw error;
        }
    },
    setWebhook: (e) => {
        try {
            const response = BotController.create(this._userStore)
                .setWebhook();
            
            return NavigationController.create(this._userStore)
                .reload()
                .build();
                
        } catch (error) {
            return UiEventHandlers.handleError(error);
        }
    },
    deleteWebhook: (e) => {
        try {
            return BotController.create(this._userStore)
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
    back: (e) => {
        return UiEventHandlers.back(e);
    },
    appendSimpleDataReply: (e) => {
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UiEventHandlers };
}