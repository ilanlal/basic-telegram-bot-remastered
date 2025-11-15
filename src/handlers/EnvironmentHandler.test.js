require('../../tests');
const { EnvironmentHandler } = require('./EnvironmentHandler');

describe('EnvironmentHandler', () => {
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    it('should create an instance of EnvironmentHandler', () => {
        const handler = new EnvironmentHandler();
        expect(handler).toBeInstanceOf(EnvironmentHandler);
    });

    // handleSaveDeploymentIdClick
    it('should handle onSaveDeploymentIdClick', () => {
        const deploymentId = 'AKfycbx...';
        const testDeploymentId = 'AKfycbz...';
        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['txt_deployment_id']: {
                        stringInputs: {
                            value: [deploymentId]
                        }
                    },
                    ['txt_test_deployment_id']: {
                        stringInputs: {
                            value: [testDeploymentId]
                        }
                    }
                }
            }
        };
        const actionResponse = EnvironmentHandler.Addon.onSaveDeploymentIdClick(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toContain('Deployment ID identified successfully.');
    });

    // handleSaveDefaultLanguage
    it('should handle onSaveDefaultLanguageClick', () => {
        const languageCode = 'en';
        const mockEvent = {
            parameters: { languageCode: languageCode }
        };
        const actionResponse = EnvironmentHandler.Addon.onSaveDefaultLanguageClick(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toContain('Default language saved successfully.');
    });

    // handleSaveLogEvents
    it('should handle onSaveLogEventsClick', () => {
        const mockEvent = {
            // Mock event properties if needed
        };
        const actionResponse = EnvironmentHandler.Addon.onSaveLogEventsClick(mockEvent);
        expect(actionResponse).toBeDefined();
        // Further assertions can be added based on the expected behavior
    });

    // handleSaveAdminChatId
    it('should handle onSaveAdminChatIdClick', () => {
        const adminChatId = '1234567890';

        const mockEvent = {
            commonEventObject: {
                formInputs: {
                    ['txt_admin_chat_id']: {
                        stringInputs: {
                            value: [adminChatId]
                        }
                    }
                }
            }
        };
        const actionResponse = EnvironmentHandler.Addon.onSaveAdminChatIdClick(mockEvent);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // notification present
        expect(data.notification).toBeDefined();
        expect(data.notification.text).toBe('👍 Admin Chat ID saved successfully.');
    });

    // handleSetMyEnvironmentClick
    it('should handle onSetMyEnvironmentClick', () => {
        const mockEvent = {
            // Mock event properties if needed
        };
        const actionResponse = EnvironmentHandler.Addon.onSetMyEnvironmentClick(mockEvent);
        expect(actionResponse).toBeDefined();
        // Further assertions can be added based on the expected behavior
    });

    // handleSetWebhookCallbackUrlClick
    it('should handle onSetWebhookCallbackUrlClick', () => {
        const mockEvent = {
            // Mock event properties if needed
        };
        const actionResponse = EnvironmentHandler.Addon.onSetWebhookCallbackUrlClick(mockEvent);
        expect(actionResponse).toBeDefined();
        // Further assertions can be added based on the expected behavior
    });

    // handleSetTestDeploymentIdClick
    it('should handle onSetTestDeploymentIdClick', () => {
        const mockEvent = {
            // Mock event properties if needed
        };
        const actionResponse = EnvironmentHandler.Addon.onSetTestDeploymentIdClick(mockEvent);
        expect(actionResponse).toBeDefined();
        // Further assertions can be added based on the expected behavior
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});