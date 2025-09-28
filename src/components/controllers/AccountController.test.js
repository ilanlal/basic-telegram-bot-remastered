/* eslint-disable no-undef */
require('../../types'); // Ensure the model is loaded
require('../views'); // Ensure the view component is loaded
require("@ilanlal/gasmocks");
require('../../lib/TelegramBotClient'); // Ensure the lib is loaded
require('../../services'); // Ensure the service is loaded

const { AccountController } = require('./AccountController');

describe('AccountController Tests', () => {
    let controller;

    beforeEach(() => {
        controller =
            AccountController.create(new UserStore());
    });

    test("AccountController should be defined", () => {
        expect(AccountController).toBeDefined();
    });

    test("AccountController instance should be created", () => {
        expect(controller).toBeInstanceOf(AccountController);
    });
});