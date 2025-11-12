
class EntityController {
    static create(
        userStore = UserStoreFactory.create().current,
        cardService = CardService,
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        userProperties = PropertiesService.getUserProperties()
    ) {
        return new EntityController(userStore, cardService, activeSpreadsheet, userProperties);
    }

    constructor(userStore, cardService, activeSpreadsheet, userProperties) {
        this.userStore = userStore;
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
        const sheetWrapper = EntityViewModel.SheetWrapper.create(
            this.activeSpreadsheet
        );

        return sheetWrapper.setActiveSheet(sheetMeta);
    }
    bindSheetSampleData(sheetMeta = {}) {
        const sheetWrapper = EntityViewModel.SheetWrapper.create(
            this.activeSpreadsheet
        );

        return sheetWrapper.bindSheetSampleData(sheetMeta);
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