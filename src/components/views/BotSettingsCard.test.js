require("@ilanlal/gasmocks");
const BotSettingsCard = require("./BotSettingsCard");

describe("BotSettingsCard", () => {
    it("should render correctly", () => {
        const card = BotSettingsCard.create(
            { BOT_NAME: "TestBot", BOT_DESCRIPTION: "A test bot" }
        );
        expect(card).toBeDefined();

        const builtCard = card.build();
        expect(builtCard).toBeDefined();

        const data = builtCard.getData();
        expect(data).toBeDefined();
        expect(data.name).toBe("botSettingsCard");
    });
});
