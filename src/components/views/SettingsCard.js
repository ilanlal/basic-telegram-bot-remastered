class SettingsCard {
    static get CARD_NAME() {
        return 'settingsCard';
    }

    constructor(model) {
        this._model = model;

        this._view = {
            header: () => CardService.newCardHeader()
                .setTitle('⚙️ Settings')
                .setSubtitle('Configure your bot settings here.'),
            sections: () => {
                const section = CardService.newCardSection();
                this._model.attributes.forEach(attr => {
                    section.addWidget(CardService.newTextParagraph()
                        .setText(`${attr.name}: ${attr.value}`));
                });
                return [section];
            },
            fixedFooter: () => CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('💾 Save')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('EventHandler.Addon.onSaveSettingsClicked')))
                .setSecondaryButton(CardService.newTextButton()
                    .setText('❌ Cancel')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('onCancelSettings')))
        };
    }

    static create(model = Settings.create()) {
        return new SettingsCard(model);
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName(SettingsCard.CARD_NAME)
            .setHeader(this._view.header());

        this._view.sections().forEach(section => {
            cardBuilder.addSection(section);
        });

        cardBuilder.setFixedFooter(this._view.fixedFooter());
        
        return cardBuilder.build();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = SettingsCard;
}