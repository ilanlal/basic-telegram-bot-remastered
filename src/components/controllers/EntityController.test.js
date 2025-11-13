require('../../../tests');
const { EntityController } = require('./EntityController');
const { EMD } = require('../../config/EMD');
const { UserStoreFactory } = require('../../services/UserStore');

describe('Entity Controller', () => {
    const userProperties = PropertiesService.getUserProperties();
    test('should create an instance using the static create method', () => {
        const entityController = EntityController.create();
        expect(entityController).toBeInstanceOf(EntityController);
    });

    // pushCard
    test('should push a card to the card service', () => {
        const entityController = EntityController.create(
            null,
            CardService,
            SpreadsheetApp.getActiveSpreadsheet(),
            userProperties
        );

        const actionResponseBuilder = entityController.pushCard(
            EMD.Home.card({}));

        expect(actionResponseBuilder).toBeDefined();
        const builtResponse = actionResponseBuilder.build();
        expect(builtResponse).toBeDefined();
        const data = builtResponse.getData();
        expect(data).toBeDefined();
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
        //console.log(JSON.stringify(data, null, 2));
    });
});