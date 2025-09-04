require("../../tests");
const HomeCard = require("./HomeCard");

describe('HomeCard Tests', () => {
    test("should create a HomeCard instance", () => {
        const card = new HomeCard();
        expect(card).toBeInstanceOf(HomeCard);
    });

    test("should build a CardService.Card", () => {
        const builtCard = new HomeCard()
        .setState({ webhookSet: true, botTokenSet: true })
        .build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(HomeCard.CARD_NAME);
    });
});