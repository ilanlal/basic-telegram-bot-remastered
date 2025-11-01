require('../../../tests');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
const { BotSetupController } = require('./BotSetupController');

describe('BotSetupController Tests', () => {
    test("BotSetupController should be defined", () => {
        expect(BotSetupController).toBeDefined();
    });

    describe('Static create method', () => {
        let controller;

        beforeEach(() => {
            UrlFetchAppStubConfiguration.reset();
            controller = BotSetupController.create(
                UserStoreFactory.create().next,
                PropertiesService.getUserProperties()
            );
        });

        test("BotSetupController instance should be created", () => {
            expect(controller).toBeInstanceOf(BotSetupController);
        });

        describe('Controller methods', () => {
            test("identifyNewBotToken should validate a correct token", () => {
                const token = '[FAKE_NEW_BOT_TOKEN]';
                const contentText = `{
                                        "result": {
                                            "id": 5555555509,
                                            "is_bot": true,
                                            "first_name": "DummyNewBot",
                                            "username": "DummyNewBotUsername"
                                        }
                                    }`;

                UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getMe`)
                    .return(new HttpResponse().setContentText(contentText));


                const result = controller
                    .identifyNewBotToken(token);
                expect(result).toBeDefined();
                expect(result.id).toBe(5555555509);
                expect(result.is_bot).toBe(true);
                expect(result.first_name).toBe("DummyNewBot");
                expect(result.username).toBe("DummyNewBotUsername");
            });
            test("identifyNewBotToken should throw error for invalid token", () => {
                expect(() => {
                    controller.identifyNewBotToken("");
                }).toThrow("Invalid bot token");
            });
            test("setNewBotToken should store the token", () => {
                const userProperties = PropertiesService.getUserProperties();
                const testToken = "new_valid_token";
                controller = BotSetupController.create(
                    UserStoreFactory.create().next,
                    userProperties
                );
                controller.setNewBotToken(testToken);
                expect(userProperties.getProperty("bot_api_token")).toBe(testToken);
            });
        });
    });
});