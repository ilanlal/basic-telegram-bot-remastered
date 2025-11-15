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
            SpreadsheetStubConfiguration.reset();
            controller = BotSetupController.create(
                PropertiesService.getUserProperties(),
                SpreadsheetApp.getActiveSpreadsheet()
            );
            SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
                .bindSheetSampleData(EMD.BotSetup.sheet({}));
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
                expect(userProperties.getProperty(EnvironmentModel.InputMeta.DEBUG_MODE)).toBe('true');
                controller.setDebugMode(false);
                expect(userProperties.getProperty(EnvironmentModel.InputMeta.DEBUG_MODE)).toBe('false');
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
            //setNewDefaultLanguage method.
            test("setNewDefaultLanguage should store the language code", () => {
                const userProperties = PropertiesService.getUserProperties();
                const testLanguageCode = "es";
                controller = BotSetupController.create(
                    userProperties
                );
                controller.setNewDefaultLanguage(testLanguageCode);
                expect(userProperties.getProperty("default_language")).toBe(testLanguageCode);
            });
            // setNewActiveSpreadsheetId method.
            test("setNewActiveSpreadsheetId should store the spreadsheet ID", () => {
                const userProperties = PropertiesService.getUserProperties();
                const testSpreadsheetId = "spreadsheet_12345";
                controller = BotSetupController.create(
                    userProperties
                );
                controller.setNewActiveSpreadsheetId(testSpreadsheetId);
                expect(userProperties.getProperty("active_spreadsheet_id")).toBe(testSpreadsheetId);
            });

            // setNewWebhookCallbackUrl method. 
            test("setNewWebhookCallbackUrl should store the webhook callback URL", () => {
                const userProperties = PropertiesService.getUserProperties();
                const testUrl = "https://example.com/webhook";
                controller = BotSetupController.create(
                    userProperties
                );
                controller.setNewWebhookCallbackUrl(testUrl);
                expect(userProperties.getProperty("webhook_callback_url")).toBe(testUrl);
            });

            // setNewEnvironment method.
            test("setNewEnvironment should store the environment", () => {
                const userProperties = PropertiesService.getUserProperties();
                const testEnvironment = "production";
                controller = BotSetupController.create(
                    userProperties,
                    SpreadsheetApp.getActiveSpreadsheet()
                );
                controller.setNewEnvironment(testEnvironment);
                expect(userProperties.getProperty("environment")).toBe(testEnvironment);
            });

            // setNewTestDeploymentId method.
            test("setNewTestDeploymentId should store the test deployment ID", () => {
                const userProperties = PropertiesService.getUserProperties();
                const testDeploymentId = "test_deployment_12345";
                controller = BotSetupController.create(
                    userProperties,
                    SpreadsheetApp.getActiveSpreadsheet()
                );
                controller.setNewTestDeploymentId(testDeploymentId);
                expect(userProperties.getProperty(EnvironmentModel.InputMeta.TEST_DEPLOYMENT_ID)).toBe(testDeploymentId);
            });

            describe('Bot info methods', () => {
                const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
                EnvironmentModel.create(
                    PropertiesService.getUserProperties(),
                    SpreadsheetApp.getActiveSpreadsheet()
                ).setNewBotToken(sampleToken);

                test("setMyName should set bot name", () => {
                    const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyName`;
                    UrlFetchAppStubConfiguration.when(apiUrl)
                        .return(new HttpResponse()
                            .setContentText(JSON.stringify({ result: true })));
                    const response = controller.setMyName();
                    expect(JSON.stringify(response.langs)).toContain('default');
                });

                test("setMyDescription should set bot description", () => {
                    const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyDescription`;
                    UrlFetchAppStubConfiguration.when(apiUrl)
                        .return(new HttpResponse()
                            .setContentText(JSON.stringify({ result: true })));
                    const response = controller.setMyDescription();
                    expect(JSON.stringify(response.langs)).toContain('default');
                });

                test("setMyShortDescription should set bot short description", () => {
                    const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyShortDescription`;
                    UrlFetchAppStubConfiguration.when(apiUrl)
                        .return(new HttpResponse()
                            .setContentText(JSON.stringify({ result: true })));
                    const response = controller.setMyShortDescription();
                    expect(JSON.stringify(response.langs)).toContain('default');
                });

                test("setMyCommands should set bot commands", () => {
                    const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyCommands`;
                    UrlFetchAppStubConfiguration.when(apiUrl)
                        .return(new HttpResponse()
                            .setContentText(JSON.stringify({ result: true })));
                    const response = controller.setMyCommands();
                    expect(JSON.stringify(response.langs)).toContain('default');
                });

            });
        });
    });
});