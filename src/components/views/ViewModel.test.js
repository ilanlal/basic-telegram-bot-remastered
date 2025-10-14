require('../../../tests');
const ViewModel = require('./ViewModel');

describe('ViewModel', () => {
    it('should create a card with the correct name', () => {
        const testCardData = {
            id: 'testCard',
            name: 'Test Card',
            description: 'This is a test card',
            attributes: [
                { id: 'field1', name: 'Field 1', type: 'string', value: 'Value 1' },
                { id: 'field2', name: 'Field 2', type: 'number', value: 42 },
                { id: 'field3', name: 'Field 3', type: 'boolean', value: true }
            ]
        };
        const viewModel = ViewModel.createFromObject(testCardData);
        expect(viewModel).toBeDefined();
        const card = viewModel.newCardBuilder();
        expect(card).toBeDefined();
        const builtCard = card.build();
        const data = builtCard.getData();
        expect(data.name).toBe(testCardData.name + 'Card');
        expect(data.header.title).toBe(testCardData.name);
        expect(data.header.subTitle).toBe(testCardData.description);
        expect(data.sections.length).toBe(3);
    });
});