/* eslint-disable no-undef */
require("../../__mocks__");
require("../services");
const { TelegramBotClient, TelegramBotClientFactory } = require("../..");
require("../components/models");
require("../components/controllers");
require("../components/views");

const {
    onDefaultHomePageOpen,
    onOpenAccountCard,
    onShowAboutCard
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
});
