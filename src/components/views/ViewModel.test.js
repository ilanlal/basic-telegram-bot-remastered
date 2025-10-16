require('../../../tests');
const ViewModel = require('./ViewModel');

describe('ViewModel', () => {
    it('should create a "add"card with the correct name and data', () => {
        const testCardData = {
            entityName: 'testCard',
            displayName: 'Test Card',
            description: 'This is a test card',
            displayType: 'add',
            imageUrl: 'https://example.com/image.png',
            sections: [{
                header: 'Section 1',
                collapsible: false,
                numUncollapsibleWidgets: 0,
                widgets: [
                    { id: 'field1', name: 'Field 1', render:'TextInput', type: 'string', value: 'Value 1' },
                    { id: 'field2', name: 'Field 2', render:'TextInput', type: 'number', value: 42 },
                    { id: 'field3', name: 'Field 3', render:'DecoratedText', type: 'boolean', value: true }
                ]
            }]
        };
        const viewModel = ViewModel.createFromObject(testCardData);
        expect(viewModel).toBeDefined();
        const card = viewModel.newCardBuilder();
        expect(card).toBeDefined();
        const builtCard = card.build();
        const data = builtCard.getData();
        expect(data).toBeDefined();
        expect(data.name).toBe(testCardData.entityName + '_Card');
        //expect(data.getName()).toBe(testCardData.entityName + '_Card');
        expect(data.header.title).toBe(`${testCardData.displayType}: ${testCardData.entityName}`);
        expect(data.header.subTitle).toBe(testCardData.description);
        expect(data.sections.length).toBe(1);
        expect(data.sections[0].header).toBe('Section 1');
        expect(data.sections[0].widgets.length).toBe(3);
        expect(data.sections[0].widgets[0].text).toBeDefined();
        expect(data.sections[0].widgets[0].value).toBeDefined();
        expect(data.sections[0].widgets[1].text).toBeDefined();
        expect(data.sections[0].widgets[1].value).toBeDefined();
        expect(data.sections[0].widgets[2].topLabel).toBeDefined();
    });

    it('should create a "default" card with the correct name and data', () => {
        const testCardData = {
            entityName: 'testCard',
            displayName: 'Test Card',
            description: 'This is a test card',
            displayType: 'default',
            imageUrl: 'https://example.com/image.png',
            sections: [] // No sections for view type
        };
        const viewModel = ViewModel.createFromObject(testCardData);
        expect(viewModel).toBeDefined();
        const card = viewModel.newCardBuilder();
        expect(card).toBeDefined();
        const builtCard = card.build();
        const data = builtCard.getData();
        expect(data).toBeDefined();
        expect(data.name).toBe(testCardData.entityName + '_Card');
        expect(data.header.title).toBe(`${testCardData.displayType}: ${testCardData.entityName}`);
        expect(data.header.subTitle).toBe(testCardData.description);
        expect(data.sections.length).toBe(4);
        expect(data.sections[0].header).toBe('Entity Information');
        expect(data.sections[0].widgets.length).toBe(7);
        expect(data.sections[0].widgets[0].text).toBeDefined();
    });
});