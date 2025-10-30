class EntityController {
    static create(userStore = UserStoreFactory.create().current, cardService = CardService, activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new EntityController(userStore, cardService, activeSpreadsheet);
    }

    constructor(userStore, cardService, activeSpreadsheet) {
        this.userStore = userStore;
        this.cardService = cardService;
        this.activeSpreadsheet = activeSpreadsheet;
    }

    pushCard(cardMeta = {}) {
        const viewModel = EntityViewModel.create({
            cardService: this.cardService,
            activeSpreadsheet: this.activeSpreadsheet
        });

        // Set values from userStore if needed
        const setupFlow = SetupFlow.create(this.userStore);
        const cardBuilder = viewModel.getCardBuilder(cardMeta);
        return this.cardService.newActionResponseBuilder()
            .setNavigation(
                this.cardService.newNavigation()
                    .pushCard(cardBuilder.build())
            );
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