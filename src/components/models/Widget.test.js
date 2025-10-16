const { Widget } = require('./Widget');

describe('Widget', () => {
    test('should initialize with full data', () => {
        const widget = {
            id: 'testId',
            name: 'Test Id',
            render: 'TextInput',
            description: 'A test widget',
            type: 'string',
            value: 'defaultValue',
        };

        const createdWidget = Widget.create(widget);
        expect(createdWidget.id).toBe(widget.id);
        expect(createdWidget.name).toBe(widget.name);
        expect(createdWidget.render).toBe(widget.render);
        expect(createdWidget.description).toBe(widget.description);
        expect(createdWidget.type).toBe(widget.type);
        expect(createdWidget.value).toBe(widget.value);
        expect(createdWidget.toObject()).toEqual(widget);
    });

    test('should throw error if id is missing', () => {
        expect(() => Widget.create({ name: 'No ID' }))
            .toThrow('Widget id is required');
    });
        
});