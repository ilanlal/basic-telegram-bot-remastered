require('../../../tests');

const { EMD } = require('../../config/EMD');
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
    it('should create a card from the cardMeta', () => {
        const cardMeta = EMD.Bot.cardMeta;
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
        expect(data.sections).toBeDefined();
        expect(data.sections.length).toBe(cardMeta.sections.length);
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