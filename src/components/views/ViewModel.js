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
        this._card = ViewModel.CardWrapper.create(CardService);
    }

    newCardBuilder() {
        const cardBuilder = this._card.newCardBuilder()
            .setName(`${this.entity.entityName}_Card`)
            .setHeader(this._card.newCardHeader(this.entity))
            .setFixedFooter(this._card.newFixedFooter(this.entity));

        if (this.entity.displayType === 'default' || this.entity.displayType === 'view') {
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

ViewModel.CardWrapper = class {
    static create(cardService = CardService) {
        return new ViewModel.CardWrapper(cardService);
    }

    constructor(cardService) {
        // Use the global CardService in Apps Script environment
        this._cardService = cardService;
    }
    newCardBuilder() {
        return this._cardService.newCardBuilder();
    }
    newCardHeader(entity) {
        return this._cardService.newCardHeader()
            .setTitle(`${entity.displayType}: ${entity.entityName}`)
            .setSubtitle(entity.description || "..")
            .setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageUrl(entity.imageUrl || 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png');
    }
    newCardSection(section) {
        const cardSection = this._cardService.newCardSection();
        cardSection.setHeader(section.header || '');
        cardSection.setCollapsible(section.collapsible || false);
        cardSection.setNumUncollapsibleWidgets(section.numUncollapsibleWidgets || 0);
        // cardSection.setCollapserControl(section.collapseControl || 'COLLAPSE_CONTROL_NONE');

        if (section.widgets && Array.isArray(section.widgets)) {
            section.widgets.forEach(widget => {
                let cardWidget = null;
                switch (widget.render) {
                    case 'DecoratedText':
                        cardWidget = this.newDecoratedText(widget);
                        break;
                    case 'TextInput':
                        cardWidget = this.newTextInput(widget);
                        break;
                    case 'SelectionInput':
                        // To be implemented
                        console.warn('SelectionInput not implemented yet');
                        break;
                    case 'TextParagraph':
                        cardWidget = this.newTextParagraph(widget);
                        break;
                    default:
                        console.warn(`Unknown widget render type: ${widget.render}, defaulting to TextInput`);
                        cardWidget = this.newTextInput(widget);
                }
                cardSection.addWidget(cardWidget);
            });
        }

        return cardSection;
    }
    newDecoratedText(widget) {
        return CardService.newDecoratedText()
            .setTopLabel(`${widget.name || '[No Name]'}`)
            .setText(`${widget.description || ''}`)
            .setBottomLabel(widget.value ? "🟢 - On" : "🔘 - Off")
            .setWrapText(true)
            .setButton(
                CardService.newTextButton()
                    .setText(widget.value ? "🚫 Disable" : "✅ Enable")
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName("EventHandler.Addon.onToggleBooleanSetting")
                            .setParameters({
                                settingId: widget.id,
                                currentValue: String(widget.value),
                            })
                    )
            );
    }
    newFixedFooter(entity) {
        const fixedFooter = this._cardService.newFixedFooter();
        if (entity.displayType === 'edit' || entity.displayType === 'add') {
            fixedFooter.setPrimaryButton(
                this._cardService.newTextButton()
                    .setText("💾 Save")
                    .setOnClickAction(
                        this._cardService.newAction()
                            .setFunctionName("EventHandler.Addon.onSave")
                            .setParameters({
                                action: entity.displayType,
                                data: JSON.stringify(entity.sections.map(
                                    section => ({
                                        header: section.header,
                                        widgets: section.widgets.map(widget => ({
                                            id: widget.id,
                                            name: widget.name,
                                            type: widget.type,
                                            value: widget.value
                                        }))
                                    }))),
                                entityName: entity.entityName
                            })));
        } else {
            fixedFooter.setPrimaryButton(
                this._cardService.newTextButton()
                    .setText(`🚧 ${entity.entityName}`)
                    .setOnClickAction(
                        this._cardService.newAction()
                            .setFunctionName("EventHandler.Addon.onInitializeSheet")
                            .setParameters({
                                entityName: entity.entityName,
                                displayName: entity.displayName
                            })
                    ));

        }

        return fixedFooter;
    }
    newTextInput(data) {
        return CardService.newTextInput()
            .setFieldName(data.id)
            .setTitle(data.title || data.name || '[No Name]')
            .setValue(data.value !== undefined && data.value !== null ? String(data.value) : '')
            .setHint(data.hint || data.description || '')
            .setMultiline(data.type === 'string' && (data.value || '').length > 50)
            .setOnChangeAction(
                CardService.newAction()
                    .setFunctionName("EventHandler.Addon.onTextInputChange")
                    .setParameters({
                        fieldId: data.id,
                        entityName: data.entityName || '',
                        entityId: data.entityId || ''
                    })
            );
    }
    newTextParagraph(data) {
        return CardService.newTextParagraph()
            .setText(data.test || data.value || data.description || data.name || '...')
            .setMaxLines(data.maxLines || 3);
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = ViewModel;
}