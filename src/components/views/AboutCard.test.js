require("@ilanlal/gasmocks");
const AboutCard = require("./AboutCard");

describe("Test AboutCard", () => {
    let card;
    beforeEach(() => {
        card = AboutCard.create({ 
            packageInfo: {
                version: "1.0.0", build: "100"
            }
        });
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
        expect(cardData.header).toBeDefined();
        expect(cardData.header.title).toBe("🗨️ About");
        expect(cardData.header.subTitle).toBe("A simple Telegram bot powered by Google Apps Script.");
        
    });
});
