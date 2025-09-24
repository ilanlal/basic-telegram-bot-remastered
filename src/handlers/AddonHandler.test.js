require('@ilanlal/gasmocks');
require('../services');
require('../helpers');
require('../components/models');
require('../components/controllers');
require('../components/views');
const { AddonHandler } = require('./AddonHandler');

describe('AddonHandler', () => {
    it('should create an instance of AddonHandler', () => {
        const handler = new AddonHandler();
        expect(handler).toBeInstanceOf(AddonHandler);
    });

    it('should handle onHomePageOpen', () => {
        const handler = new AddonHandler();
        const event = {}; // Mock event object
        const actionResponse = handler.handleOnHomePageOpen(event);
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
        const handler = new AddonHandler();
        const event = {}; // Mock event object
        const actionResponse = handler.handleOnAccountCardOpen(event);
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
        const handler = new AddonHandler();
        const event = {}; // Mock event object
        const actionResponse = handler.handleOnAboutCardOpen(event);
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

});