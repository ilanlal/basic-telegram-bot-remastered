class BotSetupHandler {
    static MISSING_INPUT_ERROR = "Required form inputs are missing.";
    static MISSING_BOT_API_TOKEN_ERROR = "Bot API token is required.";
    static FORM_INPUT_NAMES = {
        BOT_API_TOKEN: 'txt_bot_api_token',
        DEFAULT_LANGUAGE: 'txt_default_language',
        DEPLOYMENT_ID: 'txt_deployment_id',
        ADMIN_CHAT_ID: 'txt_admin_chat_id',
        DEBUG_MODE: 'txt_debug_mode'
    };
    static saveNewBotSetupInfo(e) {
        try {
            const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
            if (!formInputs) {
                throw new Error(BotSetupHandler.MISSING_INPUT_ERROR);
            }

            const newBotApiToken = formInputs[BotSetupHandler.FORM_INPUT_NAMES.BOT_API_TOKEN]?.stringInputs.value[0];
            if (!newBotApiToken) {
                throw new Error(BotSetupHandler.MISSING_BOT_API_TOKEN_ERROR);
            }
            const newLanguageCode = formInputs[BotSetupHandler.FORM_INPUT_NAMES.DEFAULT_LANGUAGE]?.stringInputs.value[0];
            const newDeploymentId = formInputs[BotSetupHandler.FORM_INPUT_NAMES.DEPLOYMENT_ID]?.stringInputs.value[0];
            const newChatId = formInputs[BotSetupHandler.FORM_INPUT_NAMES.ADMIN_CHAT_ID]?.stringInputs.value[0]; // Assuming 'myChatId' is the input field name
            const newDebugMode = formInputs[BotSetupHandler.FORM_INPUT_NAMES.DEBUG_MODE]?.stringInputs.value[0];

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