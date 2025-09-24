require('@ilanlal/gasmocks');
require('../../services');
require('../../handlers');
require('../../helpers');
require('../models');
require('../views');

const { AutomationController } = require('./AutomationConstroller');

const automationController = AutomationController.create();

describe('AutomationController', () => {
    it('should create an instance of AutomationController', () => {
        expect(automationController).toBeInstanceOf(AutomationController);
    });

    // navigateToAutomations
    it("navigateToAutomations should return a CardService.Card", () => {
        const actionResponse = automationController.navigateToAutomations();
        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
    });
});