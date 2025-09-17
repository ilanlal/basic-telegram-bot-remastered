require("@ilanlal/gasmocks");
const BotAutomationsCard = require("./BotAutomationsCard");

describe("BotAutomationsCard", () => {
    it("should render correctly", () => {
        const builder = new BotAutomationsCard()
            .withBotInfo({ name: "TestBot", username: "test_bot" })
            .addReply({ trigger: "Hello", response: "Hi there!" })
            .newCardBuilder();
        const builtCard = builder.build();
        expect(builtCard).toBeDefined();
    });

    it("should throw error if botInfo is not set", () => {
        expect(() => new BotAutomationsCard().newCardBuilder()).toThrow("Bot info is not set");
    });
});
