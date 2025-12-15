require('../../../tests');
const { CardController } = require('./CardController');
const { EMD } = require('../../config/EMD');

describe('Entity Controller', () => {
    const userProperties = PropertiesService.getDocumentProperties();
    test('should create an instance using the static create method', () => {
        const cardController = CardController.create();
        expect(cardController).toBeInstanceOf(CardController);
    });

    // pushCard
    test('should push a card to the card service', () => {
        const cardServiceController = CardController.create(
            CardService,
            SpreadsheetApp.getActiveSpreadsheet(),
            userProperties
        );

        const actionResponseBuilder = cardServiceController.pushCard(
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