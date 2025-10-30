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
        const dataSets = {};
        const storedApiToken = this.userStore.getBotToken();

        if (storedApiToken) {
            if (Array.isArray(cardMeta.sections)) {
                cardMeta.sections.forEach(section => {
                    if (Array.isArray(section.widgets)) {
                        section.widgets.forEach(widget => {
                            if (widget.fieldName === 'botToken') {
                                widget.initialValue = storedApiToken;
                            }
                        });
                    }
                });
            }
        }

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