require('../../tests');

const { EntityHandler } = require('./EntityHandler');

describe('EntityHandler', () => {
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    it('should create an instance of EntityHandler', () => {
        const handler = new EntityHandler();
        expect(handler).toBeInstanceOf(EntityHandler);
    });

    // onOpenCardClick
    it('should handle onOpenCardClick', () => {
        const event = {
            parameters: {
                entityName: 'testEntity'
            }
        }; // Mock event object
        const actionResponse = EntityHandler.Addon.onOpenCardClick(event);
        expect(actionResponse).toBeDefined();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});