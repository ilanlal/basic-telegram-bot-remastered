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
});
