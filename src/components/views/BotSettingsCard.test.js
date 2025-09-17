require("@ilanlal/gasmocks");
const BotSettingsCard = require("./BotSettingsCard");

describe("BotSettingsCard", () => {
    it("should render correctly", () => {
        const card = new BotSettingsCard();
        const builder = card.newCardBuilder();
        expect(builder).toBeDefined();

        const builtCard = builder.build();
        expect(builtCard).toBeDefined();

        const data = builtCard.getData();
        expect(data).toBeDefined();
        expect(data.name).toBe("botSettingsCard");
    });
});
