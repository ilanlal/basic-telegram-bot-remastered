const { Widget } = require('./Widget');

describe('Widget', () => {
    test('should initialize with empty data', () => {
        const widget = Widget.create({ id: 'testId', name: 'Test Id' });
        expect(widget.id).toBe('testId');
        expect(widget.name).toBe('Test Id');
        expect(widget.toObject()).toEqual({
            id: 'testId',
            name: 'Test Id',
            description: undefined,
            value: undefined,
            type: undefined
        });
    });
});