class test_BotCard {
    constructor() {
        QUnit.module("BotCard (views)");
        this.runTests();
    }

    runTests() {
        const tests = [
            "test_create"
        ];
        tests.forEach(test => this[test]());
    }

    test_create() {
        QUnit.test("Test create BotCard", (assert) => {
            const localization = AppManager.getLocalizationResources();

            const cardBuilder = ViewBuilder.newBotHomeCard(localization);
            assert.ok(cardBuilder, "BotHomeCard should be created");
            const card = cardBuilder
                .build()
                .printJson();
            assert.ok(card, "BotHomeCard should build successfully");
            const cardJson = JSON.parse(card);
            assert.ok(cardJson.header, "BotHome card header should be present");
        });
    }
}