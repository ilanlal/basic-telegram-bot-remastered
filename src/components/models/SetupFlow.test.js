require('@ilanlal/gasmocks');
require('../../lib'); // Ensure the lib is loaded
require('../../services');
const { SetupFlow } = require('./SetupFlow');

describe('SetupFlow', () => {
    /** @type {SetupFlow} */
    let model;

    beforeEach(() => {
        model = SetupFlow.create(PropertiesService.getUserProperties());
    });

    test('should create a SetupFlow instance', () => {
        expect(model).toBeInstanceOf(SetupFlow);
    });

    // setNewDefaultLanguage
    test('should set a new default language', () => {
        const newLanguageCode = 'es';
        model.setNewDefaultLanguage(newLanguageCode);
        expect(model.stateObject.defaultLanguage).toBe(newLanguageCode);
    });

    // setNewBotToken
    test('should set a new bot token', () => {
        const newToken = '[DUMMY_BOT_TOKEN]';
        const contentText = `{
            "result": {
                "id": 123456789,
                "is_bot": true,
                "first_name": "Test",
                "last_name": "User",
                "username": "testuser",
                "language_code": "en"
            }
        }`;
        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${newToken}/getMe`)
            .return(new HttpResponse()
                .setContentText(contentText));
        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${newToken}/getWebhookInfo`)
            .return(new HttpResponse().setContentText(`{"ok":true,"result":{}}`));

        model.identifyNewBotToken(newToken);
        expect(model.stateObject.botToken).toBe(newToken);
    });

    // setNewChatId
    test('should set a new chat id', () => {
        const newChatId = 123456789;
        model.setMyNewChatId(newChatId);
        expect(model.stateObject.chatId).toBe(newChatId + "");
    });

    // setNewDeploymentId
    test('should set a new deployment id', () => {
        const newDeploymentId = 'new_deployment_id';
        model.setNewDeploymentId(newDeploymentId);
        expect(model.stateObject.deploymentId).toBe(newDeploymentId);
    });

});