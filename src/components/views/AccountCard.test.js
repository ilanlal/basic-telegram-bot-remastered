const { co } = require("co");

require("../models");
require("@ilanlal/gasmocks");
const AccountCard = require("./AccountCard");


describe("Test AccountCard", () => {
    let card;
    beforeEach(() => {
        card = new AccountCard();
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