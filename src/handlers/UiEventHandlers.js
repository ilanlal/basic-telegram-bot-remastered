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

            const newLanguageCode = formInputs['DEFAULT_LANGUAGE']?.stringInputs.value[0];
            const newDeploymentId = formInputs['DEPLOYMENT_ID']?.stringInputs.value[0];
            const newChatId = formInputs['MY_CHAT_ID']?.stringInputs.value[0]; // Assuming 'myChatId' is the input field name

            BotController.create(UserStoreFactory.create().current)
                .saveDeploymentId(newDeploymentId)
                .saveMyChatId(newChatId)
                .saveDefaultLanguage(newLanguageCode);

            return NavigationController.create(UserStoreFactory.create().current)
                .reload()
                .build();
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

            const response = BotController.create(UserStoreFactory.create().current)
                .registerBotToken(botToken);

            return NavigationController.create(UserStoreFactory.create().current)
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

            return BotController.create(UserStoreFactory.create().current)
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
            const response = BotController.create(UserStoreFactory.create().current)
                .saveDeploymentId(deploymentId);

            return NavigationController.create(UserStoreFactory.create().current)
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
            const response = BotController.create(UserStoreFactory.create().current)
                .saveMyChatId(chatId);

            return NavigationController.create(UserStoreFactory.create().current)
                .reload()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error).build();
        }
    },
    setWebhook: (e) => {
        try {
            const response = BotController.create(UserStoreFactory.create().current)
                .setWebhook();

            return NavigationController.create(UserStoreFactory.create().current)
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
            const response = BotController.create(UserStoreFactory.create().current)
                .saveMyChatId(chatId);

            return NavigationController.create(UserStoreFactory.create().current)
                .reload()
                .build();
        } catch (error) {
            return UiEventHandlers.handleError(error).build();
        }
    },
    deleteWebhook: (e) => {
        try {
            const response = BotController.create(UserStoreFactory.create().current)
                .deleteWebhook();

            return NavigationController.create(UserStoreFactory.create().current)
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