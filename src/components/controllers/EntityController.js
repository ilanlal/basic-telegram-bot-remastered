
class EntityController {
    static create(
        cardService = CardService,
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        userProperties = PropertiesService.getScriptProperties()
    ) {
        return new EntityController(cardService, activeSpreadsheet, userProperties);
    }

    constructor(cardService, activeSpreadsheet, userProperties) {
        this.cardService = cardService;
        this.activeSpreadsheet = activeSpreadsheet;
        this.userProperties = userProperties;
    }

    pushCard(cardMeta = {}) {
        const cardWeapper = EntityViewModel.CardServiceWrapper
            .create(this.cardService, this.userProperties);

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
    module.exports = { EntityController };
}