require("@ilanlal/gasmocks");
const NewBotTokenCard = require("./NewBotTokenCard");

describe("BotSetupCard", () => {
    test("should create a BotSetupCard instance", () => {
        const response = NewBotTokenCard.create({ BOT_TOKEN: '' });
        expect(response).toBeDefined();
        const builtCard = response.build();
        expect(builtCard).toBeDefined();
        const data = builtCard.getData();
        expect(data).toBeDefined();
        expect(data.name).toBe(NewBotTokenCard.CARD_NAME);
        expect(data.header).toBeDefined();
        expect(data.header.title).toBe("Welcome to Basic Telegram Bot!");
    });

    test("should build a CardService.Card", () => {
        const builtCard = NewBotTokenCard.create({
            BOT_TOKEN: ''
        }).build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(NewBotTokenCard.CARD_NAME);
    });
});