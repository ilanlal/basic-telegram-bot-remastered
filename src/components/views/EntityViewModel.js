class EntityViewModel {
    static INVALID_MODEL_ERROR = "Invalid data model provided to ViewModel.create(meta.name), missing meta.name property.";
    static DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png';
    static create({ cardService = CardService, activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet() } = {}) {
        return new EntityViewModel({
            sheetWrapper: EntityViewModel.SheetWrapper.create(activeSpreadsheet),
            cardWrapper: EntityViewModel.CardServiceWrapper.create(cardService)
        });
    }

    constructor({ sheetWrapper, cardWrapper } = {}) {
        // Initialize SpreadsheetService
        this._sheetWrapper = sheetWrapper;

        // Use the global CardService in Apps Script environment
        this._cardWrapper = cardWrapper;
    }

    getCardBuilder(cardMeta = {}) {
        return this._cardWrapper.newCardBuilder(cardMeta);
    }

    getActiveSheet(sheetMeta) {
        return this._sheetWrapper.getSheet(sheetMeta);
    }

    get sheetWrapper() {
        return this._sheetWrapper;
    }

    /** @returns {EntityViewModel.CardServiceWrapper} */
    get cardWrapper() {
        return this._cardWrapper;
    }
};

EntityViewModel.SheetWrapper = class {
    static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new EntityViewModel.SheetWrapper(activeSpreadsheet);
    }
    constructor(activeSpreadsheet) {
        this._activeSpreadsheet = activeSpreadsheet;
        this._columns = [];
        this._sheetName = null;
        this._sheet = null;
    }

    initializeSheet(sheetMeta = {}) {
        if (!sheetMeta.name) {
            throw new Error(EntityViewModel.INVALID_MODEL_ERROR);
        }
        this._sheetName = sheetMeta.name;
        this._columns = sheetMeta.columns || [];
        let sheet = this._activeSpreadsheet.getSheetByName(this._sheetName);
        if (!sheet) {
            sheet = this._activeSpreadsheet.insertSheet(this._sheetName);

            if (this._columns.length > 0) {
                sheet.appendRow(this._columns);
            }
        }
        this._sheet = sheet;
        return sheet;
    }

    setActiveSheet(sheetMeta = {}) {
        return this._activeSpreadsheet
            .setActiveSheet(this.getSheet(sheetMeta));
    }

    getSheet(sheetMeta = {}) {
        return this._sheet = this.initializeSheet(sheetMeta);
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

EntityViewModel.CardServiceWrapper = class {
    static DEFAULT_BUTTON_LABEL = 'Button';
    static DEFAULT_BUTTON_CLICK_HANDLER = 'EventHandler.Addon.onButtonClick';

    static TEXT_BUTTON_PARAMETERS_DEFAULT = {};
    static TEXT_PARAGRAPH_MAX_LINES_DEFAULT = 3;
    static TEXT_PARAGRAPH_TEXT_DEFAULT = 'Paragraph text here';

    // Default Card Header Values
    static DEFAULT_IMAGE_URL = EntityViewModel.DEFAULT_IMAGE_URL;
    static DEFAULT_IMAGE_STYLE = CardService.ImageStyle.SQUARE;
    static DEFAULT_IMAGE_ALT_TEXT = 'Card Image';
    
    // Error Messages
    static FIXED_FOOTER_PRIMARY_BUTTON_REQUIRED_ERROR = "Fixed footer must have a primaryButton defined.";
    static TEXT_INPUT_VALIDATION_ERROR = "TextInput widget must have an 'id' property.";
    
    static create(cardService = CardService) {
        return new EntityViewModel.CardServiceWrapper(cardService);
    }

    constructor(cardService) {
        // Use the global CardService in Apps Script environment
        this._cardService = cardService;
    }

    newCardBuilder(cardMeta = {}) {
        const cardBuilder = this._cardService.newCardBuilder();

        // Set card name
        cardBuilder.setName(`${cardMeta.name || 'No Name'}`);

        // Set card header
        if (cardMeta.header) {
            cardBuilder.setHeader(
                this.newCardHeader(cardMeta.header));
        }

        // Set fixed footer if provided
        if (cardMeta.fixedFooter) {
            cardBuilder.setFixedFooter(
                this.newFixedFooter(cardMeta.fixedFooter)
            );
        }

        // Add sections
        if (cardMeta.sections && Array.isArray(cardMeta.sections)) {
            cardMeta.sections.forEach(section => {
                cardBuilder.addSection(
                    this.newCardSection(section));
            });
        }

        return cardBuilder;
    }

    newCardHeader(headerMeta = {}) {
        return this._cardService.newCardHeader()
            .setTitle(`${headerMeta.title || ''}`)
            .setSubtitle(headerMeta.subTitle || '')
            .setImageStyle(headerMeta.imageStyle || CardService.ImageStyle.SQUARE)
            .setImageUrl(headerMeta.imageUrl || EntityViewModel.DEFAULT_IMAGE_URL)
            .setImageAltText(headerMeta.imageAltText || 'Card Image');
    }

    newFixedFooter(fixedFooterMeta = {}) {
        if (!fixedFooterMeta.primaryButton) {
            throw new Error(EntityViewModel.CardServiceWrapper.FIXED_FOOTER_PRIMARY_BUTTON_REQUIRED_ERROR);
        }
        const fixedFooter = this._cardService.newFixedFooter();

        const primaryButton = this.newTextButton({
            text: fixedFooterMeta.primaryButton.textButton?.text || 'Primary Action',
            functionName: fixedFooterMeta.primaryButton.functionName || 'EventHandler.Addon.onPrimaryAction',
            parameters: fixedFooterMeta.primaryButton.parameters || {}
        });
        fixedFooter.setPrimaryButton(primaryButton);

        if (fixedFooterMeta.secondaryButton) {
            fixedFooter.setSecondaryButton(
                this.newTextButton({
                    text: fixedFooterMeta.secondaryButton.text || 'Secondary Action',
                    functionName: fixedFooterMeta.secondaryButton.handler || 'EventHandler.Addon.onSecondaryAction',
                    parameters: fixedFooterMeta.secondaryButton.parameters || {}
                })
            );
        }

        return fixedFooter;
    }

    newCardSection(sectionMeta = {}) {
        const cardSection = this._cardService.newCardSection();
        cardSection.setHeader(sectionMeta.header || '');
        cardSection.setCollapsible(sectionMeta.collapsible || false);
        cardSection.setNumUncollapsibleWidgets(sectionMeta.numUncollapsibleWidgets || 0);
        // cardSection.setCollapserControl(section.collapseControl || 'COLLAPSE_CONTROL_NONE');

        if (sectionMeta.widgets && Array.isArray(sectionMeta.widgets)) {
            sectionMeta.widgets.forEach(widgetMeta => {
                const cardWidget = this.newWidget(widgetMeta);
                if (cardWidget) {
                    cardSection.addWidget(cardWidget);
                }
            });
        }

        return cardSection;
    }

    newWidget(widgetMeta = {}) {
        if (widgetMeta.decoratedText) {
            return this.newDecoratedText(widgetMeta.decoratedText);
        }

        if (widgetMeta.textInput) {
            return this.newTextInput(widgetMeta.textInput);
        }

        if (widgetMeta.textParagraph) {
            return this.newTextParagraph(widgetMeta.textParagraph);
        }

        if (widgetMeta.textButton) {
            return this.newTextButton(widgetMeta.textButton);
        }

        console.warn(`Unknown widget type: ${Object.keys(widgetMeta).join(', ')}, defaulting to view.type`);
        return null;
    }

    newDecoratedText(decoratedTextMeta = {}) {
        const decoratedText = this._cardService.newDecoratedText()
            .setTopLabel(`${decoratedTextMeta.topLabel || ''}`)
            .setWrapText(decoratedTextMeta.wrapText || false)
            .setText(`${decoratedTextMeta.text || ''}`)
            .setBottomLabel(`${decoratedTextMeta.bottomLabel || ''}`);

        if (decoratedTextMeta.textButton) {
            decoratedText.setButton(
                this.newTextButton(decoratedTextMeta.textButton));
        }

        return decoratedText;
    }

    newTextInput(inputTextMeta = {}) {
        if (!inputTextMeta.id) {
            throw new Error(EntityViewModel.TEXT_INPUT_VALIDATION_ERROR);
        }
        return CardService.newTextInput()
            .setFieldName(inputTextMeta.id || '')
            .setTitle(inputTextMeta.title || '[Title]')
            .setValue(inputTextMeta.value !== undefined && inputTextMeta.value !== null ? String(inputTextMeta.value) : '')
            .setHint(inputTextMeta.hint || inputTextMeta.description || '')
            .setMultiline(inputTextMeta.type === 'string' && (inputTextMeta.value || '').length > 50);
    }

    newTextParagraph(textParagraphMeta) {
        return CardService.newTextParagraph()
            .setText(textParagraphMeta.text || 'Paragraph text here');
        //.setMaxLines(data.maxLines || 3);
    }

    newTextButton(textButtonMeta = {}) {
        return this._cardService.newTextButton()
            .setText(textButtonMeta.text || 'Button')
            .setOnClickAction(
                this._cardService.newAction()
                    .setFunctionName(textButtonMeta.functionName || 'EventHandler.Addon.onButtonClick')
                    .setParameters(textButtonMeta.parameters || {})
            );
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = EntityViewModel;
}