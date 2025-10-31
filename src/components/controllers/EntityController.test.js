require('../../../tests');
const { EntityController } = require('./EntityController');
const { EMD } = require('../../config/EMD');
const { UserStoreFactory } = require('../../services/UserStore');
const { SetupFlow } = require('../models/SetupFlow');

describe('Entity Controller', () => {
    test('should create an instance using the static create method', () => {
        const entityController = EntityController.create();
        expect(entityController).toBeInstanceOf(EntityController);
    });

    // pushCard
    test('should push a card to the card service', () => {
        const entityController = EntityController.create(
            UserStoreFactory.create().current,
            CardService,
            SpreadsheetApp.getActiveSpreadsheet()
        );

        // Set values from userStore if needed
        const setupFlow = SetupFlow.create(UserStoreFactory.create().current);

        const actionResponseBuilder = entityController.pushCard(
            EMD.Home.cardMeta, [
            { name: 'active', value: setupFlow.isActive }, 
            { name: 'admin', value: false }]);
            
        expect(actionResponseBuilder).toBeDefined();
        const builtResponse = actionResponseBuilder.build();
        expect(builtResponse).toBeDefined();
        const data = builtResponse.getData();
        expect(data).toBeDefined();
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });
});