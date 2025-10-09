class UiEventHandlers {
    static back(e) {
        try {
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popCard())
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    }
    static handleError(error) {
        console.error('🚨🚨🚨🚨🚨Error occurred:', error);
        // Show an error message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText('An error occurred: ' + error.message));
    }
}

UiEventHandlers.Home = {
    openCreateNewBotCard: (e) => {
        try {
            return NavigationController
                .create(UserStoreFactory.create().current)
                .navigateToNewBotTokenCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    },
    openBotSetupCard: (e) => {
        try {
            return NavigationController
                .create(UserStoreFactory.create().current)
                .navigateToBotSetupCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    },
    openBotSettingsCard: (e) => {
        try {
            return NavigationController
                .create(UserStoreFactory.create().current)
                .navigateToSettingCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    },
    openAutomationRepliesCard: (e) => {
        try {
            return NavigationController
                .create(UserStoreFactory.create().current)
                .navigateToAutomationCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    },
    openDeploymentSettingsCard: (e) => {
        try {
            return NavigationController
                .create(UserStoreFactory.create().current)
                .navigateToNewDeploymentIdCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    },
    openUsersManagementCard: (e) => {
        try {
            return NavigationController
                .create(UserStoreFactory.create().current)
                .navigateToUsersManagementCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    },
    openSetMyChatIdCard: (e) => {
        try {
            return NavigationController
                .create(UserStoreFactory.create().current)
                .navigateToSetMyChatIdCard()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    },
    back: (e) => {
        return UiEventHandlers.back(e);
    }
};

UiEventHandlers.Bot = {
    onSaveBotSetupSettingsClick: (e) => {
        try {
            const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
            if (!formInputs) {
                throw new Error("Form inputs are missing");
            }

            const newBotToken = formInputs['BOT_TOKEN']?.stringInputs.value[0];
            const newDeploymentId = formInputs['deploymentId']?.stringInputs.value[0];
            const newChatId = formInputs['myChatId']?.stringInputs.value[0]; // Assuming 'myChatId' is the input field name
        } catch (error) {
            return UiEventHandlers.handleError(error)
                .build();
        }
    },
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
            return UiEventHandlers.handleError(error)
            .build();
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
    saveDeploymentId: (e) => {
        try {
            const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
            if (!formInputs) {
                throw new Error("Form inputs are missing");
            }
            const deploymentId = formInputs?.['deploymentId']?.stringInputs.value[0];
            const response = BotController.create(this._userStore)
                .saveDeploymentId(edeploymentId);

            return NavigationController.create(this._userStore)
                .reload()
                .build();

        } catch (error) {
            return UiEventHandlers.handleError(error)
            .build();
        }
    },
    saveMyChatId: (e) => {
        try {
            const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
            if (!formInputs) {
                throw new Error("Form inputs are missing");
            }
            const chatId = parseInt(formInputs?.['myChatId']?.stringInputs.value[0]); // Assuming 'myChatId' is the input field name
            const response = BotController.create(this._userStore)
                .saveMyChatId(chatId);

            return NavigationController.create(this._userStore)
                .reload()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error).build();
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
            return UiEventHandlers.handleError(error).build();
        }
    },
    saveMyChatId: (e) => {
        try {
            const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
            if (!formInputs) {
                throw new Error("Form inputs are missing");
            }
            const chatId = parseInt(formInputs?.['chatId']?.stringInputs.value[0]); // Assuming 'chatId' is the input field name
            const response = BotController.create(this._userStore)
                .saveMyChatId(chatId);

            return NavigationController.create(this._userStore)
                .reload()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error).build();
        }
    },
    deleteWebhook: (e) => {
        try {
            const response = BotController.create(this._userStore)
                .deleteWebhook();

            return NavigationController.create(this._userStore)
                .reload()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error).build();
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
    onAddAutomationClick: (e) => {
        try {
            const userStore = UserStoreFactory.create();
            const repliesSheetService = RepliesSheetService.create(
                SpreadsheetApp.getActiveSpreadsheet(),
                'en'
            );
            repliesSheetService.addDemoData();
            repliesSheetService.setActiveSheet();
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText('Demo automations added to the spreadsheet!'))
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error).build();
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UiEventHandlers };
}