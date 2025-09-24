require("@ilanlal/gasmocks");
require('../../lib'); // Ensure the lib is loaded
require('../../services'); // Ensure the service is loaded
require('../models'); // Ensure the model is loaded
require('../views'); // Ensure the component is loaded

const { RootController } = require('./RootController');

const rootController = RootController.create(new UserStore());

describe('RootController', () => {
    it('should create an instance of RootController', () => {
        expect(rootController).toBeInstanceOf(RootController);
    });

    it('should navigate to HomeCard', () => {
        const actionResponse = rootController.navigateToHome();
        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
    });
});