require("@ilanlal/gasmocks");
const BotAutomationsCard = require("./BotAutomationsCard");

describe("BotAutomationsCard", () => {
    let card;
    beforeEach(() => {
        // Reset any global state if necessary
        card = BotAutomationsCard.create();
    });

    it("should render correctly", () => {
        const builtCard = card.build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(BotAutomationsCard.CARD_NAME);
    });
});
