class SettingsCard {
    static get CARD_NAME() {
        return 'settingsCard';
    }

    constructor(model) {
        this._model = model;

        this._view = {
            header: () => CardService.newCardHeader()
                .setTitle('⚙️ Developer Settings')
                .setSubtitle('Enable or disable features'),
            section: (attr) => {
                const section = CardService.newCardSection();
                if (attr.type === 'boolean') {
                    section.addWidget(
                        this._view._booleanDecoratedText(attr));
                } else {
                    section.addWidget(
                        this._view._textInput(attr));
                }
                return section;
            },
            _booleanDecoratedText: (attr) => {
                return CardService.newDecoratedText()
                    .setTopLabel(`${attr.name}`)
                    .setText(`${attr.description}`)
                    .setBottomLabel(attr.value ? '✅ Enabled' : '❌ Disabled')
                    .setWrapText(true)
                    .setButton(CardService.newTextButton()
                        .setText(attr.value ? '🚫 Disable' : '✅ Enable')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('EventHandler.Addon.onToggleBooleanSetting')
                            .setParameters({
                                settingId: attr.id,
                                currentValue: String(attr.value)
                            })))
            },
            _textInput: (attr) => {
                return CardService.newTextInput()
                    .setFieldName(attr.id)
                    .setTitle(attr.name)
                    .setValue(String(attr.value))
                    .setHint(attr.description);
            },
            fixedFooter: () => CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('💾 Save')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('EventHandler.Addon.onSaveSettingsClicked')))
        };
    }

    static create(model = Settings.create().load()) {
        return new SettingsCard(model);
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName(SettingsCard.CARD_NAME)
            .setHeader(this._view.header());

        this._model.attributes.forEach(attr => {
            cardBuilder.addSection(
                this._view.section(attr));
        });

        cardBuilder.setFixedFooter(this._view.fixedFooter());

        return cardBuilder.build();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = SettingsCard;
}