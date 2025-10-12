const { Attribute } = require('./Attribute');

describe('Attribute', () => {
    test('should initialize with empty data', () => {
        const attribute = Attribute.create({ id: 'testId' });
        expect(attribute.id).toBe('testId');
        expect(attribute.name).toBeUndefined();
        expect(attribute.toObject()).toEqual({
            id: 'testId',
            name: undefined,
            description: undefined,
            value: undefined,
            type: undefined
        });
    });
});