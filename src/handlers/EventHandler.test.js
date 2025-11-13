require('../../tests');

const { EventHandler } = require('./EventHandler');

describe('EventHandler', () => {
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });
    it('should create an instance of EventHandler', () => {
        const handler = new EventHandler();
        expect(handler).toBeInstanceOf(EventHandler);
    });

    it('should onOpenHomeCard', () => {
        /* @see https://core.telegram.org/bots/api#getwebhookinfo */
        const token = '[FAKE_DUMMY_BOT_TOKEN]';
        const contentText = `{
            "result": {
                "url": "https://example.com/webhook",
                "has_custom_certificate": false,
                "pending_update_count": 0,
                "ip_address": "192.0.2.1",
                "last_error_date": 0,
                "last_error_message": "",
                "max_connections": 40,
                "allowed_updates": []
            }
        }`;

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getWebhookInfo`)
            .return(new HttpResponse().setContentText(contentText));

        const event = {}; // Mock event object
        const actionResponse = EventHandler.Addon.onOpenHomeCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    it('should handle onAccountCardOpen', () => {
        const event = {}; // Mock event object
        const actionResponse = EventHandler.Addon.onOpenAccountCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();

        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    it('should handle onAboutCardOpen', () => {
        const event = {}; // Mock event object
        const actionResponse = EventHandler.Addon.onOpenAboutCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    it('should handle onOpenSettingsCard', () => {
        const event = {}; // Mock event object
        const actionResponse = EventHandler.Addon.onOpenSettingsCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });

    it('should handle onWebhookManagementClick action: "setWebhook"', () => {
        const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
        const deploymentId = 'AKfycbx...';
        const callbackUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
        const setWebhookUri = `https://api.telegram.org/bot${sampleToken}/setWebhook?url=${callbackUrl}`;
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
        const userProperties = PropertiesService.getUserProperties();
        controller = BotSetupController.create(
            userProperties
        );
        controller.setNewDeploymentId(deploymentId);
        controller.setNewBotToken(sampleToken);
        const event = {
            parameters: { action: 'setWebhook' }
        }; // Mock event object
        const actionResponse = EventHandler.Addon.onWebhookManagementClick(event);
        expect(actionResponse).toBeDefined();
        console.log(JSON.stringify(actionResponse, null, 2))
    });

    it('should handle onBotSetupClick', () => {
        const token = '[FAKE_DUMMY_BOT_TOKEN]';
        const contentText = `{
            "result": {
                "url": "https://example.com/webhook",
                "has_custom_certificate": false,
                "pending_update_count": 0,
                "ip_address": "192.0.2.1",
                "last_error_date": 0,
                "last_error_message": "",
                "max_connections": 40,
                "allowed_updates": []
            }
        }`;

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getMe`)
            .return(new HttpResponse().setContentText(JSON.stringify({
                result: {
                    id: 1234567809,
                    is_bot: true,
                    first_name: "TestBot",
                    username: "TestBotUsername"
                }
            })));
        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getWebhookInfo`)
            .return(new HttpResponse().setContentText(contentText));
        const event = {}; // Mock event object
        const actionResponse = EventHandler.Addon.onBotSetupClick(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
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
        const actionResponse = EventHandler.Addon.onIdentifyTokenClick(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toBe('👍 Bot token identified successfully.');
    });

    // handleSaveAdminChatId
    it('should handle onSaveAdminChatIdClick', () => {
        const adminChatId = '1234567890';

        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['txt_admin_chat_id']: {
                        stringInputs: {
                            value: [adminChatId]
                        }
                    }
                }
            }
        };
        const actionResponse = EventHandler.Addon.onSaveAdminChatIdClick(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toBe('👍 Admin Chat ID saved successfully.');
    });

    // Additional tests for other handlers can be added similarly
});