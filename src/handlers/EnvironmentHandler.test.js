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

    afterEach(() => {
        jest.clearAllMocks();
    });
});