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

        const widget1 = Widget.create(widget);
        expect(widget1.id).toBe(widget.id);
        expect(widget1.view).toEqual(widget.view);
        expect(widget1.value).toBe(widget.value);
        expect(widget1.type).toBe(widget.type);
        expect(widget1.tabIndex).toEqual(0);
        // Ensure tabIndex is unique and auto-incremented
        widget.id = 'modifiedId';
        const widget2 = Widget.create(widget);
        expect(widget2.id).toBe(widget.id);
        expect(widget2.tabIndex).toEqual(1);
    });

    test('should throw error if id is missing', () => {
        expect(() => Widget.create({ view: { type: 'TextInput' }, value: 'No ID' }))
            .toThrow('Widget id is required');
    });

});