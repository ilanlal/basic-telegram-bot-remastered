require('../../../tests');
const EntityViewModel = require('./EntityViewModel');

describe('EntityViewModel', () => {
    it('should create an instance using the static create method', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        expect(viewModel).toBeDefined();
    });
    
    // getCardBuilder
    it('should create a card with the correct name and data', () => {
        const cardMeta = {
            name: 'addBotCard',
            header: {
                title: 'Add Bot',
                subTitle: 'Add a new bot to the system',
                imageUrl: 'https://example.com/add_bot_image.png',
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Add Bot Image'
            },
            sections: [{
                header: 'Section 1',
                collapsible: false,
                numUncollapsibleWidgets: 0,
                widgets: [
                    { id: 'field1', TextInput: { hint: 'Enter text for Field 1', title: 'Field 1' }, type: 'string', value: 'Value 1' },
                    { id: 'field2', TextInput: { hint: 'Enter text for Field 2', title: 'Field 2' }, type: 'number', value: 42 },
                    { id: 'field3', DecoratedText: { hint: 'Enter text for Field 3', title: 'Field 3' }, type: 'boolean', value: true }
                ]
            }],
            fixedFooter: {
                primaryButton: {
                    textButton: {
                        text: 'Submit',
                        functionName: 'EventHandler.Addon.onSubmit',
                        parameters: {
                            action: 'submitAddBot'
                        }
                    }
                }
            }
        };
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        expect(viewModel).toBeDefined();
        const card = viewModel.getCardBuilder(cardMeta);
        expect(card).toBeDefined();
        const builtCard = card.build();
        const data = builtCard.getData();
        expect(data).toBeDefined();
        expect(data.name).toBe(cardMeta.name);
        expect(data.header).toBeDefined();
        expect(data.header.title).toBe(cardMeta.header.title);
        expect(data.header.subTitle).toBe(cardMeta.header.subTitle);
        expect(data.header.imageUrl).toBe(cardMeta.header.imageUrl);
        expect(data.header.imageStyle).toBe(cardMeta.header.imageStyle);
        expect(data.header.imageAltText).toBe(cardMeta.header.imageAltText);
        console.log(JSON.stringify(data, null, 2));
    });

    // getActiveSheet
    it('should get the active sheet', () => {
        const sheetMeta = {
            name: 'TestSheet',
            columns: ['Column1', 'Column2', 'Column3']
        };
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const activeSheet = viewModel.getActiveSheet(sheetMeta);
        expect(activeSheet).toBeDefined();
    });
});