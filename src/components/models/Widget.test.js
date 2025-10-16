const { Widget } = require('./Widget');

describe('Widget', () => {
    test('should initialize with full data', () => {
        const widget = {
            id: 'testId',
            view: {
                type: 'TextInput',
                title: 'Test Title',
                value: 'Test Value',
                hint: 'Test Hint',
                multiline: false
            },
            value: 'Test Value',
            type: 'string'
        };

        const createdWidget = Widget.create(widget);
        expect(createdWidget.id).toBe(widget.id);
        expect(createdWidget.view).toEqual(widget.view);
        expect(createdWidget.value).toBe(widget.value);
        expect(createdWidget.type).toBe(widget.type);
    });

    test('should throw error if id is missing', () => {
        expect(() => Widget.create({ view: { type: 'TextInput' }, value: 'No ID' }))
            .toThrow('Widget id is required');
    });

});