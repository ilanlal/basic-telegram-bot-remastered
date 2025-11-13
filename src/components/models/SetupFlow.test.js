require('../../../tests');
const { SetupFlow } = require('./SetupFlow');
const { EnvironmentModel } = require('./EnvironmentModel');

describe('SetupFlow', () => {
    /** @type {SetupFlow} */
    let model;
    const environmentModel = EnvironmentModel.create(PropertiesService.getUserProperties());
    beforeEach(() => {
        model = SetupFlow.create(PropertiesService.getUserProperties());
    });

    test('should create a SetupFlow instance', () => {
        expect(model).toBeInstanceOf(SetupFlow);
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

    describe('webhook', () => {
        const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
        const deploymentId = 'AKfycbx...';
        const callbackUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

        // setWebhook
        test('should set webhook', () => {
            const setWebhookUri = `https://api.telegram.org/bot${sampleToken}/setWebhook?url=${callbackUrl}`;
            UrlFetchAppStubConfiguration.when(setWebhookUri)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            environmentModel.setNewDeploymentId(deploymentId);
            environmentModel.setNewBotToken(sampleToken);
            const response = model.setWebhook();

            expect(response.result).toBe(true);
        });

        // deleteWebhook
        test('should delete webhook', () => {
            const deleteWebhookUri = `https://api.telegram.org/bot${sampleToken}/deleteWebhook?url=${callbackUrl}`;
            UrlFetchAppStubConfiguration.when(deleteWebhookUri)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            environmentModel.setNewDeploymentId(deploymentId);
            environmentModel.setNewBotToken(sampleToken);
            const response = model.deleteWebhook(callbackUrl);
            expect(response.result).toBe(true);
        });
    });

    describe('set bot info', () => {
        const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';

        test('should set bot name', () => {
            const data = { name: "NewBotName", language_code: "en" };
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyName`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            environmentModel.setNewBotToken(sampleToken);
            const response = model.setMyName(data);
            expect(response.result).toBe(true);
        });

        // setMyDescription
        test('should set bot description', () => {
            const data = { description: "This is a test bot", language_code: "en" };
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyDescription`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            environmentModel.setNewBotToken(sampleToken);
            const response = model.setMyDescription(data);
            expect(response.result).toBe(true);
        });

        // setMyShortDescription
        test('should set bot short description', () => {
            const data = { short_description: "Short description", language_code: "en" };
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyShortDescription`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            environmentModel.setNewBotToken(sampleToken);
            const response = model.setMyShortDescription(data);
            expect(response.result).toBe(true);
        });

        // setMyCommands
        test('should set bot commands', () => {
            const commands = [
                { command: "/start", description: "Start the bot" },
                { command: "/help", description: "Get help" }
            ]
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyCommands`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            environmentModel.setNewBotToken(sampleToken);
            const response = model.setMyCommands({ commands, scope: undefined, language_code: undefined });
            expect(response.result).toBe(true);
        });
    });
});