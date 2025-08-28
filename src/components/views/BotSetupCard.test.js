require("./");
require("../../");

describe("BotSetupCard", () => {
    test("should create a BotSetupCard instance", () => {
        const card = new BotSetupCard();
        expect(card).toBeInstanceOf(BotSetupCard);
    });

    test("should build a CardService.Card", () => {
        const card = new BotSetupCard();
        const builtCard = card.build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(BotSetupCard.CARD_NAME);
    });
});