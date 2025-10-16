class ViewModel {
    static createFromObject(object = {}) {
        return new ViewModel(
            Entity.createFromObject(object)
        );
    }

    constructor(entity = null) {
        if (!entity) {
            throw new Error('Entity is required to build the card');
        }
        this.entity = entity;
        this.spreadsheetService = null;
        // Use the global CardService in Apps Script environment
        this._card = ViewModel.CardServiceWrapper.create(CardService);
    }

    newCardBuilder() {
        const cardBuilder = CardService.newCardBuilder()
            .setName(`${this.entity.entityName}_Card`)
            .setHeader(this._card.newCardHeader(this.entity))
            .setFixedFooter(this._card.newFixedFooter(this.entity));

        if (this.entity.displayType === 'edit') {
            this.entity.sections.forEach(section => {
                cardBuilder.addSection(
                    this._card.newCardSection(section));
            });
        }

        return cardBuilder;
    }

    initializeSheet(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        const sheet = activeSpreadsheet.getSheetByName(this.entity.name) ||
            activeSpreadsheet.insertSheet(this.entity.name);

        sheet.appendRow(this.entity.attributes.map(attr => attr.name));
        sheet.appendRow(this.entity.attributes.map(attr => attr.value));
        return sheet;
    }
}

ViewModel.Spreadsheet = {
    toEntity: (sheet) => {
        const data = sheet.getDataRange().getValues();
        const headers = data.shift();
        const entity = Entity.create(sheet.getSheetId(), sheet.getName());

        headers.forEach((header, index) => {
            const attr = Attribute.create({
                id: `field_${index}`,
                name: header,
                type: 'string',
                value: data[0][index]
            });
            entity.addAttribute(attr);
        });

        return entity;
    }
};

ViewModel.CardServiceWrapper = class {
    static create(cardService = null) {
        return new ViewModel.CardServiceWrapper(cardService);
    }

    constructor(cardService = null) {
        // Use the global CardService in Apps Script environment
        this._cardService = cardService || CardService; // Real CardService :-)
    }
    newCardHeader(entity) {
        return this._cardService.newCardHeader()
            .setTitle(`${entity.displayType}: ${entity.entityName}`)
            .setSubtitle(entity.description || "..")
            .setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageUrl(entity.imageUrl || 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png');
    }
    newFixedFooter(entity) {
        const fixedFooter = this._cardService.newFixedFooter();
        if (entity.displayType === 'edit') {
            fixedFooter.setPrimaryButton(
                this._cardService.newTextButton()
                    .setText("💾 Save")
                    .setOnClickAction(
                        this._cardService.newAction()
                            .setFunctionName("EventHandler.Addon.onSave")
                            .setParameters({
                                data: JSON.stringify(entity.attributes || []),
                                entityName: entity.name,
                                entityId: entity.id,
                            })));
        } else {
            fixedFooter.setPrimaryButton(
                this._cardService.newTextButton()
                    .setText("📝 Initialize Sheet")
                    .setOnClickAction(
                        this._cardService.newAction()
                            .setFunctionName("EventHandler.Addon.onInitializeSheet")
                            .setParameters({
                                entityName: entity.name,
                                entityId: entity.id
                            })
                    ));

        }

        return fixedFooter;
    }
    newCardSection(section) {
        const cardSection = this._cardService.newCardSection();
        cardSection.setHeader(section.header || '');
        cardSection.setCollapsible(section.collapsible || false);
        cardSection.setNumUncollapsibleWidgets(section.numUncollapsibleWidgets || 0);
        // cardSection.setCollapserControl(section.collapseControl || 'COLLAPSE_CONTROL_NONE');

        if (section.widgets && Array.isArray(section.widgets)) {
            section.widgets.forEach(widget => {
                if (widget.type === "boolean") {
                    cardSection.addWidget(this.newDecoratedText(widget));
                } else {
                    cardSection.addWidget(this.newTextInput(widget));
                }
            });
        }

        return cardSection;
    }
    newDecoratedText(data) {
        return CardService.newDecoratedText()
            .setTopLabel(`${data.name}`)
            .setText(`${data.description}`)
            .setBottomLabel(data.value ? "🟢 - On" : "🔘 - Off")
            .setWrapText(true)
            .setButton(
                CardService.newTextButton()
                    .setText(data.value ? "🚫 Disable" : "✅ Enable")
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName("EventHandler.Addon.onToggleBooleanSetting")
                            .setParameters({
                                settingId: data.id,
                                currentValue: String(data.value),
                            })
                    )
            );
    }
    newTextInput(data) {
        return CardService.newTextInput()
            .setFieldName(data.id)
            .setTitle(data.name)
            .setValue(String(data.value))
            .setHint(data.description);
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = ViewModel;
}