require("@ilanlal/gasmocks");
require("../models");

const AccountCard = require("./AccountCard");

describe("Test AccountCard", () => {
    let card;
    beforeEach(() => {
        card = AccountCard.create({ FREE_ACTIVATION_DAYS: 14, userInfo: null });
    });

    test("should create an AccountCard instance", () => {
        expect(card).toBeInstanceOf(AccountCard);
    });

    test("should build a Card ", () => {
        const builtCard = card.build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(AccountCard.CARD_NAME);
    });
});