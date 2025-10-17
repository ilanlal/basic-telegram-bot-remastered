class ViewModel {
    static INVALID_MODEL_ERROR = "Invalid data model provided to ViewModel.create, missing entityName";

    static create({ dataModel = {}, cardService = CardService, activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet() } = {}) {
        if (!dataModel || !dataModel.entityName) {
            throw new Error(ViewModel.INVALID_MODEL_ERROR);
        }
        const entityDataModel = Entity.createFromObject(dataModel);
        return new ViewModel({
            entityDataModel,
            sheetWrapper: ViewModel.SheetWrapper.create(activeSpreadsheet, dataModel.entityName),
            cardWrapper: ViewModel.CardServiceWrapper.create(cardService)
        });
    }

    constructor({ entityDataModel, sheetWrapper, cardWrapper } = {}) {
        this._entityDataModel = entityDataModel;

        // Initialize SpreadsheetService
        this._sheetWrapper = sheetWrapper;

        // Use the global CardService in Apps Script environment
        this._cardWrapper = cardWrapper;
    }

    newCardBuilder() {
        if (this._entityDataModel.displayType === 'edit' || this._entityDataModel.displayType === 'add') {
            return this.buildEntityCardBuilder(this._entityDataModel);
        }

        return this.buildHomeCardBuilder(this._entityDataModel);
    }

    buildEntityCardBuilder(entityDataModel) {
        const cardBuilder = this._cardWrapper.newCardBuilder();

        // Basic card setup
        cardBuilder.setName(`${entityDataModel.entityName}_Card`)
            .setHeader(this._cardWrapper.newCardHeader(entityDataModel))
            .setFixedFooter(
                this._cardWrapper.newFixedFooter(entityDataModel));

        entityDataModel.sections.forEach(section => {
            cardBuilder.addSection(
                this._cardWrapper.newCardSection(section));
        });

        return cardBuilder;
    }

    buildHomeCardBuilder(entityDataModel) {
        const cardBuilder = this._cardWrapper.newCardBuilder()
            .setName(`${entityDataModel.entityName}_Card`)
            .setHeader(this._cardWrapper.newCardHeader(entityDataModel));
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
                    text: entityDataModel.entityName
                },
                type: 'string',
                value: entityDataModel.entityName
            }, {
                id: 'displayName',
                type: 'string',
                view: {
                    type: 'TextParagraph',
                    text: entityDataModel.displayName
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
                            entityId: entityDataModel.entityId || ''
                        }
                    }
                },
                value: 'Add New Row'
            },
            {
                id: 'description', type: 'string',
                view: { type: 'TextParagraph', text: entityDataModel.description || 'No description provided.' }
            },
            {
                id: 'imageUrl', type: 'string',
                view: { type: 'TextParagraph', text: entityDataModel.imageUrl || 'No image URL provided.' }
            },
            { id: 'displayType', type: 'string', view: { type: 'TextParagraph', text: entityDataModel.displayType || 'No display type provided.' } },
            { id: 'numSections', type: 'number', view: { type: 'TextParagraph', text: `Number of sections: ${entityDataModel.sections.length}` }, value: entityDataModel.sections.length },
                // Add more widgets as needed
            ]
        };

        // Add a summary section with key entity details
        cardBuilder.addSection(
            this._cardWrapper.newCardSection(section));
        return cardBuilder;
    }

    getActiveSheet() {
        return this._sheetWrapper.getSheet();
    }

    get sheetWrapper() {
        return this._sheetWrapper;
    }

    get cardWrapper() {
        return this._cardWrapper;
    }

    get entityDataModel() {
        return this._entityDataModel;
    }
};

ViewModel.SheetWrapper = class {
    static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), sheetName = null, columns = []) {
        return new ViewModel.SheetWrapper(activeSpreadsheet, sheetName, columns);
    }
    constructor(activeSpreadsheet, sheetName, columns = []) {
        this._activeSpreadsheet = activeSpreadsheet;
        this._sheetName = sheetName;
        this._columns = columns;
    }

    initializeSheet() {
        let sheet = this._activeSpreadsheet.getSheetByName(this._sheetName);
        if (!sheet) {
            sheet = this._activeSpreadsheet.insertSheet(this._sheetName);

            if (this._columns.length > 0) {
                sheet.appendRow(this._columns);
            }
        }
        return sheet;
    }

    setActiveSheet() {
        return this._activeSpreadsheet.setActiveSheet(this._sheet);
    }

    getSheet() {
        if (!this._sheet) {
            this._sheet = this.initializeSheet();
        }
        return this._sheet;
    }

    appendRow(rowData = []) {
        return this._sheet.appendRow(rowData);
    }

    get columns() {
        return this._columns;
    }

    get sheet() {
        return this._sheet;
    }

    get activeSpreadsheet() {
        return this._activeSpreadsheet;
    }

    get sheetName() {
        return this._sheetName;
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