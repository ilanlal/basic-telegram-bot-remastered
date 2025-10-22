require('../../../tests');

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