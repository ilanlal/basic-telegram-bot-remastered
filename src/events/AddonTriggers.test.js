require("..");
require("../services");
require("../libs");
require("../components/models");
require("../components/controllers");
require("../components/views");

const { co } = require("co");
const {
    onDefaultHomePageOpen,
    onOpenAccountCard,
    onShowAboutCard,
    onActivatePremium,
    onRevokeLicense,
    onNewBotToken
} = require("./AddonTriggers");

describe("AddonTriggers", () => {
    it("should handle onDefaultHomePageOpen", () => {
        const event = {}; // Mock event object
        const actionResponse = onDefaultHomePageOpen(event);
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

    it("should handle onOpenAccountCard", () => {
        const event = {
            commonEventObject: {
                userLocale: 'en',
                userCountry: 'US',
                userTimezone: 'America/New_York'
            }
        }; // Mock event object
        const actionResponse = onOpenAccountCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
        card = data.cardNavigations[0].pushCard;
    });

    it("should handle onShowAboutCard", () => {
        const event = {}; // Mock event object
        const actionResponse = onShowAboutCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
        card = data.cardNavigations[0].pushCard;
    });

    it("should handle onActivatePremium", () => {
        const event = {
            parameters: {
                userId: 'test_user',
                planId: 'premium',
                days: '7'
            }
        }; // Mock event object
        const actionResponse = onActivatePremium(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        //console.log("Action Response Data:", JSON.stringify(data, null, 2));
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { popToRoot: [Object], updateCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        //expect(data.cardNavigations[0].popToRoot).toBeDefined();
        expect(data.cardNavigations[0].updateCard).toBeDefined();
    });

    it("should handle onRevokeLicense", () => {
        const event = {}; // Mock event object
        const actionResponse = onRevokeLicense(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        //console.log("Action Response Data:", JSON.stringify(data, null, 2));
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { popToRoot: [Object], updateCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        //expect(data.cardNavigations[0].popToRoot).toBeDefined();
        expect(data.cardNavigations[0].updateCard).toBeDefined();
    });
});
