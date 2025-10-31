
class EntityController {
    static create(userStore = UserStoreFactory.create().current, cardService = CardService, activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new EntityController(userStore, cardService, activeSpreadsheet);
    }

    constructor(userStore, cardService, activeSpreadsheet) {
        this.userStore = userStore;
        this.cardService = cardService;
        this.activeSpreadsheet = activeSpreadsheet;
    }

    pushCard(cardMeta = {}, ...params) {
        const viewModel = EntityViewModel.create({
            cardService: this.cardService,
            activeSpreadsheet: this.activeSpreadsheet
        });

        const cardDataSet = {
            isActive: params.find(p => p.name === 'active')?.value || true,
            isAdmin: params.find(p => p.name === 'admin')?.value || false
        };

        const cardBuilder = viewModel.getCardBuilder(cardMeta, cardDataSet);

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