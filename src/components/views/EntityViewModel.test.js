require('../../../tests');

const { EMD } = require('../../config/EMD');
const EntityViewModel = require('./EntityViewModel');

describe('EntityViewModel', () => {
    const tests = [
        [EMD.WebhookSetup, { isActive: true }],
        [EMD.Home, { isActive: true }],
        [EMD.Automation, { isActive: true }],
        [EMD.BotSetup, { isActive: true }]
    ];

    it('should create an view model instance.', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        expect(viewModel).toBeDefined();
    });

    describe('Entity Metadata configuration', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });

        tests.forEach((emd) => {
            describe(`Testing entity: ${emd[0].entityName}`, () => {
                it(`should create a card from the "${emd[0].entityName}" cardMeta`, () => {
                    if(!emd[0].cardMeta) return;
                    const cardMeta = emd[0].cardMeta;
                    const card = viewModel.getCardBuilder(cardMeta, { isActive: true });
                    expect(card).toBeDefined();
                    const builtCard = card.build();
                    const data = builtCard.getData();
                    expect(data).toBeDefined();
                    expect(data.name).toBe(cardMeta.name);
                    expect(data.header).toBeDefined();
                    expect(data.header.title).toBe(cardMeta.header.title);
                    expect(data.header.subTitle).toBe(`${cardMeta.header.subTitle} [active:${true}]`);
                    expect(data.header.imageUrl).toBe(cardMeta.header.imageUrl);
                    expect(data.header.imageStyle).toBe(cardMeta.header.imageStyle);
                    expect(data.header.imageAltText).toBe(cardMeta.header.imageAltText);
                    expect(data.sections).toBeDefined();
                    expect(data.sections.length).toBe(cardMeta.sections.length);
                });

                it(`should get the active sheet from the "${emd[0].entityName}" sheetMeta`, () => {
                    const sheetMeta = emd[0].sheetMeta;
                    if(!sheetMeta) return;
                    const activeSheet = viewModel.getActiveSheet(sheetMeta);
                    expect(activeSheet).toBeDefined();
                });

            });
        });
    });

});