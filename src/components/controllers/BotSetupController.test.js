require("@ilanlal/gasmocks");
require('../../types'); // Ensure the model is loaded
require('../../lib'); // Ensure the lib is loaded
require('../../services'); // Ensure the service is loaded
require('../models'); // Ensure the model is loaded
require('../views'); // Ensure the component is loaded

const { BotSetupController } = require('./BotSetupController');

describe('BotSetupController Tests', () => {
    let controller;

    beforeEach(() => {
        controller = BotSetupController.create(
            UserStoreFactory.create().next
        );
    });
    test("BotSetupController should be defined", () => {
        expect(BotSetupController).toBeDefined();
    });
    test("BotSetupController instance should be created", () => {
        expect(controller).toBeInstanceOf(BotSetupController);
    });
});