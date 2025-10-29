class BotSetupHandler {
    static saveNewBotSetupInfo(e) {
        try {
            const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
            if (!formInputs) {
                throw new Error("Form inputs are missing");
            }

            const newBotApiToken = formInputs['API_TOKEN']?.stringInputs.value[0];
            const newLanguageCode = formInputs['DEFAULT_LANGUAGE']?.stringInputs.value[0];
            const newDeploymentId = formInputs['DEPLOYMENT_ID']?.stringInputs.value[0];
            const newChatId = formInputs['MY_CHAT_ID']?.stringInputs.value[0]; // Assuming 'myChatId' is the input field name

            const _ = BotController.create(UserStoreFactory.create().current);
            if (newBotApiToken) {
                _.registerBotToken(newBotApiToken);
            }
            if (newDeploymentId) {
                _.saveDeploymentId(newDeploymentId);
            }
            if (newChatId) {
                _.saveMyChatId(newChatId);
            }
            if (newLanguageCode) {
                _.saveDefaultLanguage(newLanguageCode);
            }

            return NavigationController.create(UserStoreFactory.create().current)
                .reload()
                .build();
        } catch (error) {
            return BotSetupHandler.handleError(error)
                .build();
        }
    }

    static handleError(error) {
        throw error;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotSetupHandler };
}