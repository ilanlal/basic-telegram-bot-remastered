require('../../../tests');
const ViewModel = require('./ViewModel');

describe('ViewModel', () => {
    it('should create a card with the correct name', () => {
        const card = ViewModel.Card.build(
            {
                id: 'testCard',
                name: 'Test Card',
                description: 'This is a test card',
                attributes: [
                    { id: 'field1', name: 'Field 1', type: 'string', value: 'Value 1' },
                    { id: 'field2', name: 'Field 2', type: 'number', value: 42 },
                    { id: 'field3', name: 'Field 3', type: 'boolean', value: true }
                ]
            }
        );
        expect(card).toBeDefined();
        const data = card.getData();
        expect(data.name).toBe('Test CardCard');
        expect(data.header).toBeDefined();
        expect(data.header.title).toBe('Test Card');
        expect(data.header.subTitle).toBe('This is a test card');
    });
});