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
                const sections = [];
                Object.keys(this._model.params).forEach(key => {
                    sections.push(CardService.newCardSection()
                        .addWidget(CardService.newTextParagraph()
                            .setText(`${key}: ${this._model.params[key]}`)));
                });
                return sections;
            }
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

        return cardBuilder.build();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = SettingsCard;
}