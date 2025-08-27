/* eslint-disable no-undef */
require('../models'); // Ensure the model is loaded
require('../views'); // Ensure the view component is loaded
require('../../'); // index.js
require('../../libs'); // Ensure the lib is loaded
require('../../services'); // Ensure the service is loaded

const { AccountController, AccountControllerFactory } = require('./AccountController');

describe('AccountController Tests', () => {
    let controller;

    beforeEach(() => {
        controller =
            AccountControllerFactory.create()
                .withUserStore(
                    UserStoreFactory.newUserStoreFactory()
                        .build())
                .build();
    });

    test("AccountController should be defined", () => {
        expect(AccountController).toBeDefined();
    });

    test("AccountControllerFactory should be defined", () => {
        expect(AccountControllerFactory).toBeDefined();
    });

    test("AccountController instance should be created", () => {
        expect(controller).toBeInstanceOf(AccountController);
    });

    test("navigateToHome should return a CardService.Card", () => {
        const actionResponse = AccountControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory()
                    .build())
            .build()
            .navigateToHome();

        expect(actionResponse).toBeDefined();
        const res = actionResponse.build().getData();
        const card = res.cardNavigations[0].pushCard;
        //console.log(card);
        expect(card).toBeDefined();
        expect(card.header.title).toBeDefined();
    });
});