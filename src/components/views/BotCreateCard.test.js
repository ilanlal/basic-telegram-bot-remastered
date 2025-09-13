require("../../../__mocks__");
const BotCreateCard = require("./BotCreateCard");

describe("BotSetupCard", () => {
    test("should create a BotSetupCard instance", () => {
        const card = new BotCreateCard();
        expect(card).toBeInstanceOf(BotCreateCard);
    });

    test("should build a CardService.Card", () => {
        const builder = new BotCreateCard().newCardBuilder();
        const builtCard = builder.build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(BotCreateCard.CARD_NAME);
    });
});