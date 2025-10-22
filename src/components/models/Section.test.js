require('../../../tests');
const {Section} = require('./Section');

describe('Section', () => {
    test('should initialize with full data', () => {
        const section = {
            header: 'Test Section',
            collapseControl: 'COLLAPSE_CONTROL_NONE',
            collapsible: false,
            numUncollapsibleWidgets: 0,
            widgets: [
                { id: 'widget1', name: 'Widget 1', render: 'TextInput', description: 'First widget', type: 'string', value: 'value1' },
                { id: 'widget2', name: 'Widget 2', render: 'DecoratedText', description: 'Second widget', type: 'number', value: 42 }
            ]
        };

        const createdSection = Section.createFromObject(section);
        expect(createdSection.header).toBe(section.header);
        expect(createdSection.collapseControl).toBe(section.collapseControl);
        expect(createdSection.collapsible).toBe(section.collapsible);
        expect(createdSection.numUncollapsibleWidgets).toBe(section.numUncollapsibleWidgets);
        expect(createdSection.widgets.length).toBe(2);
        expect(createdSection.widgets[0].id).toBe('widget1');
        expect(createdSection.widgets[0].name).toBe('Widget 1');
        expect(createdSection.widgets[0].render).toBe('TextInput'); // Added check for render
        expect(createdSection.widgets[0].description).toBe('First widget');
        expect(createdSection.widgets[0].type).toBe('string');
        expect(createdSection.widgets[0].value).toBe('value1');
        expect(createdSection.widgets[1].id).toBe('widget2');
        expect(createdSection.widgets[1].name).toBe('Widget 2');
        expect(createdSection.widgets[1].render).toBe('DecoratedText'); // Added check for render
        expect(createdSection.widgets[1].description).toBe('Second widget');
        expect(createdSection.widgets[1].type).toBe('number');
        expect(createdSection.widgets[1].value).toBe(42);
    });

    test('should initialize with partial data', () => {
        const section = {
            header: 'Partial Section',
            widgets: [
                { id: 'widget1', name: 'Widget 1', render: 'TextInput', type: 'string' }
            ]
        };
        const createdSection = Section.createFromObject(section);
        expect(createdSection.header).toBe(section.header);
        expect(createdSection.collapseControl).toBe(null);
        expect(createdSection.collapsible).toBe(false);
        expect(createdSection.numUncollapsibleWidgets).toBe(0);
        expect(createdSection.widgets.length).toBe(1);
        expect(createdSection.widgets[0].id).toBe('widget1');
        expect(createdSection.widgets[0].name).toBe('Widget 1');
        expect(createdSection.widgets[0].render).toBe('TextInput'); // Added check for render
        expect(createdSection.widgets[0].description).toBeUndefined();
        expect(createdSection.widgets[0].type).toBe('string');
        expect(createdSection.widgets[0].value).toBe(undefined);
    });

    test('should initialize with empty data', () => {
        const createdSection = Section.createFromObject({});
        expect(createdSection.header).toBe('');
        expect(createdSection.collapseControl).toBe(null);
        expect(createdSection.collapsible).toBe(false);
        expect(createdSection.numUncollapsibleWidgets).toBe(0);
        expect(createdSection.widgets.length).toBe(0);
    });
});