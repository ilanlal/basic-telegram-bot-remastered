const { Widget } = require('./Widget');

describe('Widget', () => {
    test('should initialize with full data', () => {
        const widget = {
            id: 'testId',
            DecoratedText: {
                text: 'Sample Text',
                topLabel: 'Top Label',
            },
            value: 'Sample Value'
        };

        const widget1 = Widget.create(widget);
        expect(widget1.id).toBe(widget.id);
        expect(widget1.value).toBe(widget.value);
        expect(widget1.tabIndex).toBe(0);
    });

    test('should throw error if id is missing', () => {
        expect(() => Widget.create({ 
            // missing id
            DecoratedText: {
                text: 'Sample Text',
                topLabel: 'Top Label',
            },
            value: 'Sample Value'
         }))
            .toThrow(Widget.INVALID_ID_ERROR);
    });

});