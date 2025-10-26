require('../../../tests');

const { EMD } = require('../../config/EMD');
const EntityViewModel = require('./EntityViewModel');

describe('EntityViewModel', () => {
    const tests = [
        EMD.Bot,
        EMD.Home,
        EMD.Automation,
        EMD.Environment
    ];

    it('should create an view model instance.', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        expect(viewModel).toBeDefined();
    });

    describe('EntityViewModel', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });

        tests.forEach((emd) => {
            describe(`Testing entity: ${emd.entityName}`, () => {                
                it('should create a card from the "Bot" cardMeta', () => {
                    if(!emd.cardMeta) return;
                    const cardMeta = emd.cardMeta;
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

                it('should get the active sheet', () => {
                    const sheetMeta = emd.sheetMeta;
                    if(!sheetMeta) return;
                    const activeSheet = viewModel.getActiveSheet(sheetMeta);
                    expect(activeSheet).toBeDefined();
                });

            });
        });
    });

});