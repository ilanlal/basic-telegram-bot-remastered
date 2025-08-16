// Google Apps Script code for Google Workspace Add-ons
class test_BotController {
    constructor() {
        QUnit.module("BotController (controllers)");
        this.runTests();
        QUnit.done(() => {
            //this.tearDown();
        });
    }

    runTests() {
        const tests = [
            "test_action_home",
        ];
        tests.forEach(test => this[test]());
    }

    test_action_home() {
        QUnit.test("Test home action", (assert) => {
            const localization = AppManager.getLocalizationResources();
            const userStore = ServiceBuilder.newUserStore();
            const homeAction = ControllerBuilder
                .newBotController(localization, userStore)
                .home()
                .build()
                .printJson();

            const actionResponse = JSON.parse(homeAction);
            assert.ok(actionResponse, "Home card should be created successfully");
            const card = actionResponse.renderActions.action.navigations[0].pushCard;
            assert.ok(card, "Card should be created successfully");
        });
    }
}