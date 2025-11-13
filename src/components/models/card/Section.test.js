require('../../../../tests');
const { Section } = require('./Section');

describe('Section', () => {
    test('should initialize with full data', () => {
        const section = {
            header: 'Test Section',
            collapseControl: 'COLLAPSE_CONTROL_NONE',
            collapsible: false,
            numUncollapsibleWidgets: 0,
            widgets: [
                {
                    TextInput: {
                        hint: 'Enter text',
                        title: 'Widget 1',
                        value: 'value1'
                    },
                    id: 'widget1',
                    value: 'value1'
                },
                {
                    DecoratedText: {
                        text: 'Widget 2',
                        topLabel: 'Top Label',
                        bottomLabel: 'Bottom Label'
                    },
                    id: 'widget2',
                    value: 42
                }
            ]
        };

        const createdSection = Section.createFromObject(section);
        expect(createdSection.header).toBe(section.header);
        expect(createdSection.collapseControl).toBe(section.collapseControl);
        expect(createdSection.collapsible).toBe(section.collapsible);
        expect(createdSection.numUncollapsibleWidgets).toBe(section.numUncollapsibleWidgets);
        expect(createdSection.widgets.length).toBe(2);
        expect(createdSection.widgets[0].id).toBe('widget1');
        expect(createdSection.widgets[0].value).toBe('value1');
        expect(createdSection.widgets[1].id).toBe('widget2');
        expect(createdSection.widgets[1].value).toBe(42);
    });

    test('should initialize with partial data', () => {
        const section = {
            header: 'Partial Section',
            widgets: [
                {
                    DecoratedText: {
                        text: 'Just a widget',
                        topLabel: 'Top Label',
                        bottomLabel: 'Bottom Label'
                    }, id: 'widget1'
                }
            ]
        };
        const createdSection = Section.createFromObject(section);
        expect(createdSection.header).toBe(section.header);
        expect(createdSection.collapseControl).toBe(null);
        expect(createdSection.collapsible).toBe(false);
        expect(createdSection.numUncollapsibleWidgets).toBe(0);
        expect(createdSection.widgets.length).toBe(1);
        expect(createdSection.widgets[0].id).toBe('widget1');
        expect(createdSection.widgets[0].value).toBe(null);
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