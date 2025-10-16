class ViewModel {
    static create(dataModel = {}) {
        return new ViewModel(
            Entity.createFromObject(dataModel));
    }

    constructor(entityDataModel) {
        this._entityDataModel = entityDataModel;
        this.spreadsheetService = null;
        // Use the global CardService in Apps Script environment
        this._card = ViewModel.CardServiceWrapper.create(CardService);
    }

    newCardBuilder() {
        if (this._entityDataModel.displayType === 'edit' || this._entityDataModel.displayType === 'add') {
            return this.buildEntityCardBuilder(this._entityDataModel);
        }

        return this.buildHomeCardBuilder(this._entityDataModel);
    }

    buildEntityCardBuilder(entityDataModel) {
        const cardBuilder = this._card.newCardBuilder();

        // Basic card setup
        cardBuilder.setName(`${entityDataModel.entityName}_Card`)
            .setHeader(this._card.newCardHeader(entityDataModel))
            .setFixedFooter(
                this._card.newFixedFooter(entityDataModel));

        entityDataModel.sections.forEach(section => {
            cardBuilder.addSection(
                this._card.newCardSection(section));
        });

        return cardBuilder;
    }

    buildHomeCardBuilder(dataModel) {
        const cardBuilder = this._card.newCardBuilder()
            .setName(`${dataModel.entityName}_Card`)
            .setHeader(this._card.newCardHeader(dataModel));
        //.setFixedFooter(this._card.newFixedFooter(this.entity));

        // Define a section with key entity details
        const section = {
            header: 'Entity Information',
            collapsible: true,
            numUncollapsibleWidgets: 3,
            widgets: [{
                id: 'entityName',
                view: {
                    type: 'TextParagraph',
                    text: dataModel.entityName
                },
                type: 'string',
                value: dataModel.entityName
            }, {
                id: 'displayName',
                type: 'string',
                view: {
                    type: 'TextParagraph',
                    text: dataModel.displayName
                }
            },
            {
                id: 'addRow',
                type: 'action',
                view: {
                    type: 'DecoratedText',
                    topLabel: 'Add New Row',
                    text: 'Click the "➕" button to add a new row to the entity',
                    bottomLabel: 'Total rows: ' + (0),
                    wrapText: true,
                    button: {
                        text: '➕',
                        handler: 'addRowHandler',
                        parameters: {
                            entityId: dataModel.entityId || ''
                        }
                    }
                },
                value: 'Add New Row'
            },
            { id: 'description', type: 'string', view: { type: 'TextParagraph', text: dataModel.description || 'No description provided.' } },
            { id: 'imageUrl', type: 'string', view: { type: 'TextParagraph', text: dataModel.imageUrl || 'No image URL provided.' } },
            { id: 'displayType', type: 'string', view: { type: 'TextParagraph', text: dataModel.displayType || 'No display type provided.' } },
            { id: 'numSections', type: 'number', view: { type: 'TextParagraph', text: `Number of sections: ${dataModel.sections.length}` }, value: dataModel.sections.length },
                //{ id: 'numAttributes', type: 'number', view: { type: 'TextParagraph', text: `Number of attributes: ${dataModel.attributes.length}` }, value: dataModel.attributes.length },
                //{ id: 'numRows', type: 'number', view: { type: 'TextParagraph', text: `Number of rows: ${dataModel.rows.length}` }, value: dataModel.rows.length },
                //{ id: 'numColumns', type: 'number', view: { type: 'TextParagraph', text: `Number of columns: ${dataModel.columns.length}` }, value: dataModel.columns.length },
                //{ id: 'lastUpdated', type: 'string', view: { type: 'TextParagraph', text: `Last updated: ${dataModel.lastUpdated || 'N/A'}` }, value: dataModel.lastUpdated || '' },
                // Add more widgets as needed
            ]
        };

        // Add a summary section with key entity details
        cardBuilder.addSection(
            this._card.newCardSection(section));
        return cardBuilder;
    }

    initializeSheet(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        const sheet = activeSpreadsheet.getSheetByName(this._entityDataModel.name) ||
            activeSpreadsheet.insertSheet(this._entityDataModel.name);

        sheet.appendRow(this._entityDataModel.attributes.map(attr => attr.name));
        sheet.appendRow(this._entityDataModel.attributes.map(attr => attr.value));
        return sheet;
    }
}

ViewModel.Spreadsheet = class {
    static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new ViewModel.Spreadsheet(activeSpreadsheet);
    }

    constructor(activeSpreadsheet) {
        this._activeSpreadsheet = activeSpreadsheet;
    }

    get activeSpreadsheet() {
        return this._activeSpreadsheet;
    }
};

ViewModel.CardServiceWrapper = class {
    static create(cardService = CardService) {
        return new ViewModel.CardServiceWrapper(cardService);
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
                switch (widget.view.type) {
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
        const view = widget.view || {};
        const decoratedText = this._cardService.newDecoratedText()
            .setTopLabel(`${view.topLabel || ''}`)
            .setWrapText(view.wrapText || false)
            .setText(`${view.text || ''}`)
            .setBottomLabel(`${view.bottomLabel || ''}`);

        if (view.button) {
            decoratedText.setButton(
                this.newTextButton({
                    text: view.button.text,
                    handler: view.button.handler,
                    parameters: view.button.parameters
                }));
        }

        return decoratedText;
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
    newTextInput(widget) {
        return CardService.newTextInput()
            .setFieldName(widget.id)
            .setTitle(widget.title || widget.name || '[No Name]')
            .setValue(widget.value !== undefined && widget.value !== null ? String(widget.value) : '')
            .setHint(widget.hint || widget.description || '')
            .setMultiline(widget.type === 'string' && (widget.value || '').length > 50);
    }
    newTextParagraph(widget) {
        return CardService.newTextParagraph()
            .setText(widget.text || widget.value || widget.description || widget.name || '...');
        //.setMaxLines(data.maxLines || 3);
    }

    newTextButton({ text, handler, parameters = {} }) {
        return this._cardService.newTextButton()
            .setText(text || 'Button')
            .setOnClickAction(
                this._cardService.newAction()
                    .setFunctionName(handler || 'EventHandler.Addon.onButtonClick')
                    .setParameters(parameters)
            );
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = ViewModel;
}