require('../../tests');

const { BotHandler } = require('./BotHandler');
const { BotSetupController } = require('../components/controllers/BotSetupController');
const { EnvironmentModel } = require('../components/models/EnvironmentModel');

describe('BotHandler', () => {
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    it('should create an instance of BotHandler', () => {
        const handler = new BotHandler();
        expect(handler).toBeInstanceOf(BotHandler);
    });

    it('should handle onWebhookToggleClick', () => {
        const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
        const deploymentId = 'AKfycbx...';
        const callbackUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
        const setWebhookUri = `https://api.telegram.org/bot${sampleToken}/setWebhook?url=${callbackUrl}`;
        PropertiesService.getDocumentProperties().setProperty(
            EnvironmentModel.InputMeta.BOT_API_TOKEN,
            sampleToken
        );
        PropertiesService.getDocumentProperties().setProperty(
            EnvironmentModel.InputMeta.DEPLOYMENT_ID,
            deploymentId
        );
        UrlFetchAppStubConfiguration.when(setWebhookUri)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ result: true })));
        const getWebhookInfoUri = `https://api.telegram.org/bot${sampleToken}/getWebhookInfo`;
        UrlFetchAppStubConfiguration.when(getWebhookInfoUri)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    result: {
                        url: callbackUrl,
                        has_custom_certificate: false,
                        pending_update_count: 0,
                        ip_address: "192.0.2.1",
                        last_error_date: 0,
                        last_error_message: "",
                        max_connections: 40,
                        allowed_updates: []
                    }
                })));
        const userProperties = PropertiesService.getDocumentProperties();
        controller = BotSetupController.create(
            userProperties
        );
        controller.setNewDeploymentId(deploymentId);
        controller.setNewBotToken(sampleToken);
        const event = {
            parameters: { action: 'setWebhook' }
        }; // Mock event object
        const actionResponse = BotHandler.Addon.onWebhookToggleClick(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toBe('👍 Webhook set successfully.');
    });


    it('should handle onIdentifyTokenClick', () => {
        const token = 'tcp://token[FAKE_DUMMY_BOT_TOKEN]&#39;;>@&-_][+0!]';
        const contentText = `{
            "result": {
                "id": 1234567809,
                "is_bot": true,
                "first_name": "TestBot",
                "username": "TestBotUsername"
            }
        }`;

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getMe`)
            .return(new HttpResponse().setContentText(contentText));

        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['txt_bot_api_token']: {
                        stringInputs: {
                            value: [token]
                        }
                    }
                }
            }
        };
        const actionResponse = BotHandler.Addon.onIdentifyTokenClick(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toBe('👍 Bot token identified successfully.');
    });
});