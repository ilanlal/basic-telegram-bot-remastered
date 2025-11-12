require('../../../tests');
const { BotSetupController } = require('./BotSetupController');

describe('BotSetupController Tests', () => {
    test("BotSetupController should be defined", () => {
        expect(BotSetupController).toBeDefined();
    });

    describe('Static create method', () => {
        /** @type {BotSetupController} */
        let controller;

        beforeEach(() => {
            UrlFetchAppStubConfiguration.reset();
            controller = BotSetupController.create(
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
                    userProperties
                );
                controller.setNewBotToken(testToken);
                expect(userProperties.getProperty("bot_api_token")).toBe(testToken);
            });
            test("setNewDeploymentId should store the deployment ID", () => {
                const userProperties = PropertiesService.getUserProperties();
                const testDeploymentId = "deployment_12345";
                controller = BotSetupController.create(
                    userProperties
                );
                controller.setNewDeploymentId(testDeploymentId);
                expect(userProperties.getProperty("deployment_id")).toBe(testDeploymentId);
            });
            test("setNewChatId should store the chat ID", () => {
                const userProperties = PropertiesService.getUserProperties();
                const testChatId = 987654321;
                controller = BotSetupController.create(
                    userProperties
                );
                controller.setNewChatId(testChatId);
                expect(userProperties.getProperty("admin_chat_id")).toBe(testChatId.toString());
            });
            test("setDebugMode should store the debug mode", () => {
                const userProperties = PropertiesService.getUserProperties();
                controller = BotSetupController.create(
                    userProperties
                );
                controller.setDebugMode(true);
                expect(userProperties.getProperty("debug_mode")).toBe('true');
                controller.setDebugMode(false);
                expect(userProperties.getProperty("debug_mode")).toBe('false');
            });

            // setWebhook method.
            test("setWebhook should call telegram client to set webhook", () => {
                const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
                const deploymentId = 'AKfycbx...';
                const callbackUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
                const setWebhookUri = `https://api.telegram.org/bot${sampleToken}/setWebhook?url=${callbackUrl}`;
                UrlFetchAppStubConfiguration.when(setWebhookUri)
                    .return(new HttpResponse()
                        .setContentText(JSON.stringify({ result: true })));

                const userProperties = PropertiesService.getUserProperties();
                controller = BotSetupController.create(
                    userProperties
                );
                controller.setNewDeploymentId(deploymentId);
                controller.setNewBotToken(sampleToken);
                const response = controller.setWebhook();
                expect(response).toBeDefined();
                expect(response.result).toBe(true);
            });
        });
    });
});