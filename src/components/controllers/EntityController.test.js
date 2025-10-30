require('../../../tests');
const { EntityController } = require('./EntityController');
const { EMD } = require('../../config/EMD');
const { UserStoreFactory } = require('../../services/UserStore');

describe('Entity Controller', () => {
    test('should create an instance using the static create method', () => {
        const entityController = EntityController.create();
        expect(entityController).toBeInstanceOf(EntityController);
    });

    // navigateToEntityView
    test('should call navigateToEntityView on navigation controller', () => {
        const entityController = EntityController.create(
            UserStoreFactory.create().current,
            CardService,
            SpreadsheetApp.getActiveSpreadsheet()
        );
        const actionResponseBuilder = entityController.pushCard(EMD.WebhookSetup.cardMeta);
        expect(actionResponseBuilder).toBeDefined();
        const builtResponse = actionResponseBuilder.build();
        expect(builtResponse).toBeDefined();
        const data = builtResponse.getData();
    });
});