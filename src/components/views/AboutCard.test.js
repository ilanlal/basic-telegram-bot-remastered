require("../../../__mocks__");
const AboutCard = require("./AboutCard");

describe("Test AboutCard", () => {
    let card;
    beforeEach(() => {
        card = new AboutCard()
            .withPackageInfo({ name: "Test Package", version: "1.0.0", build: "100" });
    });
    test("should create an AboutCard instance", () => {
        expect(card).toBeInstanceOf(AboutCard);
    });

    test("should build a Card ", () => {
        const builtCard = card.build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(AboutCard.CARD_NAME);
    });
});
