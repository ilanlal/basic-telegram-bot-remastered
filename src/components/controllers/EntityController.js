class EntityController {
    static create(userStore = UserStoreFactory.create().current, cardService = CardService, activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new EntityController(userStore, cardService, activeSpreadsheet);
    }

    constructor(edmConfig, userStore, cardService, activeSpreadsheet) {
        this.edmConfig = edmConfig;
        this.userStore = userStore;
        this.cardService = cardService;
        this.activeSpreadsheet = activeSpreadsheet;
    }

    navigate(path = 'index') {
        const viewModel = EntityViewModel.fromModel({
            dataModel: this.edmConfig[path],
            cardService: this.cardService,
            activeSpreadsheet: this.activeSpreadsheet
        });
        switch (path) {
            case 'add':
                return this.cardService.newActionResponseBuilder()
                    .setNavigation(this.cardService.newNavigation()
                        .pushCard(viewModel.getCardBuilder()
                            .build()));
            case 'edit':
                return this.cardService.newActionResponseBuilder()
                    .setNavigation(this.cardService.newNavigation()
                        .pushCard(viewModel.getCardBuilder()
                            .build()));
            case 'home':
            case 'index':
            default:
                return this.cardService.newActionResponseBuilder()
                    .setNavigation(this.cardService.newNavigation()
                        .pushCard(viewModel.getCardBuilder()
                            .build()));
        }
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