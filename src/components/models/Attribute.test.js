const { Attribute } = require('./Attribute');

describe('Attribute', () => {
    test('should initialize with empty data', () => {
        const attribute = Attribute.create({ id: 'testId', name: 'Test Id' });
        expect(attribute.id).toBe('testId');
        expect(attribute.name).toBe('Test Id');
        expect(attribute.toObject()).toEqual({
            id: 'testId',
            name: 'Test Id',
            description: undefined,
            value: undefined,
            type: undefined
        });
    });
});