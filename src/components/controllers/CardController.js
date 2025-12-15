class CardController {
    static create(
        cardService = CardService,
        documentProperties = PropertiesService.getDocumentProperties()
    ) {
        return new CardController(cardService, documentProperties);
    }

    constructor(cardService, documentProperties) {
        this.cardService = cardService;
        this.documentProperties = documentProperties;
    }

    pushCard(cardMeta = {}) {
        const cardWeapper = CardViewModel.CardServiceWrapper
            .create(this.cardService, this.documentProperties);

        const cardBuilder = cardWeapper.newCardBuilder(cardMeta);

        return this.cardService.newActionResponseBuilder()
            .setNavigation(
                this.cardService.newNavigation()
                    .pushCard(cardBuilder.build())
            );
    }
    activateSheet(sheetMeta = {}) {
        const sheetModel = SheetModel.create(this.activeSpreadsheet);
        return sheetModel.setActiveSheet(sheetMeta);
    }
    bindSheetSampleData(sheetMeta = {}) {
        const sheetModel = SheetModel.create(this.activeSpreadsheet);
        return sheetModel.bindSheetSampleData(sheetMeta);
    }
    save(edm = {}, rowIndex = -1) {
        // Implementation for save action
    }


    delete(rowIndex = -1) {
        // Implementation for delete action
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CardController };
}