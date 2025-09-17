/* eslint-disable no-undef */
require("@ilanlal/gasmocks");
require("../services");
require("../lib/TelegramBotClient");
require("../components/models");
require("../components/controllers");
require("../components/views");

const {
    onActivatePremium,
    onRevokeLicense
} = require("./Code");

describe("Code", () => {
    it("should handle onActivatePremium", () => {
        const event = {}; // Mock event object
        const actionResponse = onActivatePremium(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);

        expect(data.cardNavigations[0].popToRoot).toBeDefined();
    });

    it("should handle onRevokeLicense", () => {
        const event = {}; // Mock event object
        const actionResponse = onRevokeLicense(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].popToRoot).toBeDefined();
    });
});
