
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
        const viewModel = EntityViewModel.create({
            cardService: this.cardService,
            activeSpreadsheet: this.activeSpreadsheet,
            userProperties: this.userProperties
        });

        const cardBuilder = viewModel.getCardBuilder(cardMeta);

        return this.cardService.newActionResponseBuilder()
            .setNavigation(
                this.cardService.newNavigation()
                    .pushCard(cardBuilder.build())
            );
    }
    activateSheet(sheetMeta = {}) {
        const viewModel = EntityViewModel.create({
            cardService: this.cardService,
            activeSpreadsheet: this.activeSpreadsheet,
            userProperties: this.userProperties
        });

        return viewModel.setActiveSheet(sheetMeta);
    }
    bindSheetSampleData(sheetMeta = {}) {
        const viewModel = EntityViewModel.create({
            cardService: this.cardService,
            activeSpreadsheet: this.activeSpreadsheet,
            userProperties: this.userProperties
        });

        return viewModel.bindSheetSampleData(sheetMeta);
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