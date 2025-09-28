require("@ilanlal/gasmocks");
require("../../services");
require("../models");
require("../../types");
const { UserStoreFactory } = require("../../services/UserStore");
const { SetupFlow } = require("../models/SetupFlow");
const BotSetupCard = require("./BotSetupCard");

describe("BotSetupCard", () => {
    it("should render correctly", () => {
        const card = BotSetupCard.create(
            new SetupFlow(
                UserStoreFactory.create().current
            )
        );
        expect(card).toBeDefined();

        const builtCard = card.build();
        expect(builtCard).toBeDefined();

        const data = builtCard.getData();
        expect(data).toBeDefined();
        expect(data.name).toBe(BotSetupCard.CARD_NAME);
    });
});
