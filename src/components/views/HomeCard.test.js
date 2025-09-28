require("@ilanlal/gasmocks");
require('../../services');
require('../models');
const HomeCard = require("./HomeCard");

describe('HomeCard Tests', () => {
    test("should create a HomeCard instance", () => {
        const card = HomeCard.create(
            SetupFlow.create()
        );
        expect(card).toBeInstanceOf(HomeCard);
    });

    test("should build a CardService.Card", () => {
        const builtCard = HomeCard.create(
            SetupFlow.create()
        ).build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(HomeCard.CARD_NAME);
    });
});