require('../../tests');

const { EventHandler } = require('./EventHandler');

describe('EventHandler', () => {
    it('should create an instance of EventHandler', () => {
        const handler = new EventHandler();
        expect(handler).toBeInstanceOf(EventHandler);
    });

    it('should handle OpenOnHomeCard', () => {
        /* @see https://core.telegram.org/bots/api#getwebhookinfo */
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

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot[YOUR_BOT_TOKEN]/getWebhookInfo`)
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

    it('should handle onToggleBooleanSetting', () => {
        const event = {
            parameters: {
                settingId: 'logEvents',
                currentValue: 'true'
            }
        };
        const response = EventHandler.Addon.onToggleBooleanSetting(event);
        expect(response).toBeDefined();
        console.log(JSON.stringify(response, null, 2));
    });
    // Additional tests for other handlers can be added similarly
});