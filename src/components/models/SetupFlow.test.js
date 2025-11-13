require('../../../tests');
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

    // identifyNewBotToken
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
        expect(model.stateObject.botToken).toBe(newToken ? `${newToken.substring(0, 4)}****${newToken.substring(newToken.length - 4)}` : null);
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
        expect(model.stateObject.deploymentId).toBe(newDeploymentId ? `${newDeploymentId.substring(0, 4)}****${newDeploymentId.substring(newDeploymentId.length - 4)}` : null);
    });

    // setDebugMode
    test('should set debug mode', () => {
        model.setDebugMode(true);
        expect(model.stateObject.debugModeSet).toBe(true);
        model.setDebugMode(false);
        expect(model.stateObject.debugModeSet).toBe(false);
    });

    // setWebhook
    test('should set webhook', () => {
        const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
        const deploymentId = 'AKfycbx...';
        const callbackUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
        const setWebhookUri = `https://api.telegram.org/bot${sampleToken}/setWebhook?url=${callbackUrl}`;
        UrlFetchAppStubConfiguration.when(setWebhookUri)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ result: true })));
        model.setNewDeploymentId(deploymentId);
        model.setNewBotToken(sampleToken);
        const response = model.setWebhook();
        
        expect(response.result).toBe(true);
    });

    // deleteWebhook
    test('should delete webhook', () => {
        const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
        const deploymentId = 'AKfycbx...';
        const callbackUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
        const deleteWebhookUri = `https://api.telegram.org/bot${sampleToken}/deleteWebhook?url=${callbackUrl}`;
        UrlFetchAppStubConfiguration.when(deleteWebhookUri)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ result: true })));
        model.setNewDeploymentId(deploymentId);
        model.setNewBotToken(sampleToken);
        const response = model.deleteWebhook(callbackUrl);
        expect(response.result).toBe(true);
    });
});