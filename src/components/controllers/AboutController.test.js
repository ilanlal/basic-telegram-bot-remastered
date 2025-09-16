/* eslint-disable no-undef */
require('../models'); // Ensure the model is loaded
require('../views'); // Ensure the view component is loaded
require('../../../__mocks__'); // index.js
require('../../lib/TelegramBotClient'); // Ensure the lib is loaded
require('../../services'); // Ensure the service is loaded

const { AboutController, AboutControllerFactory } = require('./AboutController');

describe('AboutController Tests', () => {
    let controller;

    beforeEach(() => {
        controller =
            AboutControllerFactory.create()
                .withPackageInfo({
                    name: "Test Package",
                    version: "1.0.0",
                    description: "This is a test package",
                    build: "100"
                })
                .build();
    });

    test("AboutController should be defined", () => {
        expect(AboutController).toBeDefined();
    });
});