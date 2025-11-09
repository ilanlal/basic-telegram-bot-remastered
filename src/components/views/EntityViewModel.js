class EntityViewModel {
    static get INVALID_MODEL_ERROR() {
        return "Invalid data model provided to ViewModel.create(meta.name), missing meta.name property.";
    }
    static get DEFAULT_IMAGE_URL() {
        return 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png';
    }
    static create({
        cardService = CardService,
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        userProperties = PropertiesService.getUserProperties() } = {}
    ) {
        return new EntityViewModel({
            sheetWrapper: EntityViewModel.SheetWrapper.create(activeSpreadsheet),
            cardWrapper: EntityViewModel.CardServiceWrapper.create(cardService, userProperties)
        });
    }

    constructor({ sheetWrapper, cardWrapper } = {}) {
        // Initialize SpreadsheetService
        /** @type {EntityViewModel.SheetWrapper} */
        this._sheetWrapper = sheetWrapper;

        // Use the global CardService in Apps Script environment
        /** @type {EntityViewModel.CardServiceWrapper} */
        this._cardWrapper = cardWrapper;
    }

    getCardBuilder(card = {}) {
        return this._cardWrapper.newCardBuilder(card, { isActive: true });
    }

    getActiveSheet(sheetMeta) {
        return this._sheetWrapper.getSheet(sheetMeta);
    }

    setActiveSheet(sheetMeta = {}) {
        return this._sheetWrapper.setActiveSheet(sheetMeta);
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

    bindSheetSampleData(sheetMeta = {}) {
        const sheet = this.getSheet(sheetMeta);
        const sampleData = sheetMeta.sample_data || [];
        if (sampleData.length === 0) {
            return;
        }
        sampleData.forEach(row => {
            sheet.appendRow(row);
        });

        return sheet;
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
    // Default Button Values
    static get DEFAULT_BUTTON_LABEL() {
        return 'New Button';
    }
    static get DEFAULT_EVENT_CLICK_FUNCTION_NAME() {
        return 'EventHandler.Addon.onButtonClick';
    }

    // Default Card Header Values
    static get DEFAULT_IMAGE_URL() {
        return EntityViewModel.DEFAULT_IMAGE_URL;
    }
    static get DEFAULT_IMAGE_STYLE() {
        return CardService.ImageStyle.SQUARE;
    }
    static get DEFAULT_IMAGE_ALT_TEXT() {
        return 'Card Image';
    }

    // Error Messages
    static get FIXED_FOOTER_BUTTON_NOT_DEFINED_ERROR() {
        return "Fixed footer must have a primaryButton defined.";
    }
    static get TEXT_INPUT_MISSING_FIELD_NAME_ERROR() {
        return "TextInput widget must have a 'fieldName' property.";
    }
    static get DECORATED_TEXT_MISSING_CONTENT_ERROR() {
        return "DecoratedText widget must have at least one of 'text', 'decoratedText', 'topLabel', or 'bottomLabel' properties defined.";
    }
    static get TEXT_BUTTON_MISSING_PROPERTIES_ERROR() {
        return "TextButton widget must have either 'text', and 'openLink' or 'onClick' defined.";
    }

    static create(cardService = CardService, userProperties = PropertiesService.getUserProperties()) {
        return new EntityViewModel.CardServiceWrapper(cardService, userProperties);
    }

    constructor(cardService, userProperties) {
        // Use the global CardService in Apps Script environment
        this._cardService = cardService;
        this._userProperties = userProperties;
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
            .setSubtitle(`${headerMeta.subTitle || ''}`)
            .setImageStyle(headerMeta.imageStyle || CardService.ImageStyle.SQUARE)
            .setImageUrl(headerMeta.imageUrl || EntityViewModel.DEFAULT_IMAGE_URL)
            .setImageAltText(headerMeta.imageAltText || 'Card Image');
    }

    newFixedFooter(fixedFooterMeta = {}) {
        if (!fixedFooterMeta.primaryButton?.textButton) {
            throw new Error(EntityViewModel.CardServiceWrapper.FIXED_FOOTER_BUTTON_NOT_DEFINED_ERROR);
        }
        const fixedFooter = this._cardService.newFixedFooter();

        const primaryButton = this.newTextButton(fixedFooterMeta.primaryButton.textButton);
        fixedFooter.setPrimaryButton(primaryButton);

        if (fixedFooterMeta.secondaryButton) {
            fixedFooter.setSecondaryButton(
                this.newTextButton(fixedFooterMeta.secondaryButton.textButton)
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
        const _widgetInstance = Widget.create(widgetMeta, this._userProperties);
        // Bind value from 'propertyName' property if specified
        const value = _widgetInstance.value || '';

        if (widgetMeta.DecoratedText) {
            return this.newDecoratedText(widgetMeta.DecoratedText, value);
        }

        if (widgetMeta.TextInput) {
            return this.newTextInput(widgetMeta.TextInput, value);
        }

        if (widgetMeta.TextParagraph) {
            return this.newTextParagraph(widgetMeta.TextParagraph, value);
        }

        if (widgetMeta.TextButton) {
            return this.newTextButton(widgetMeta.TextButton, !!value);
        }


        console.warn(`Unknown widget type: ${Object.keys(widgetMeta).join(', ')}, defaulting to view.type`);
        return null;
    }

    newDecoratedText(dtMeta = {}, value = '') {
        // setText(text) and one of the keys: setTopLabel(text), or setBottomLabel(text) are required
        if (!dtMeta.text) {
            throw new Error(EntityViewModel.CardServiceWrapper.DECORATED_TEXT_MISSING_CONTENT_ERROR);
        }
        if (!dtMeta.topLabel && !dtMeta.bottomLabel) {
            throw new Error(EntityViewModel.CardServiceWrapper.DECORATED_TEXT_MISSING_CONTENT_ERROR);
        }
        const decoratedText = this._cardService.newDecoratedText()
            .setTopLabel(`${dtMeta.topLabel}`)
            .setWrapText(dtMeta.wrapText || false)
            .setText(`${dtMeta.text}`)
            .setBottomLabel(`${dtMeta.bottomLabel}`);

        if (dtMeta.textButton) {
            decoratedText.setButton(
                this.newTextButton(dtMeta.textButton, !!value));
        }

        return decoratedText;
    }

    newTextInput(inputTextMeta = {}, value = '') {
        if (!inputTextMeta.fieldName || String(inputTextMeta.fieldName).trim() === '') {
            throw new Error(EntityViewModel.CardServiceWrapper.TEXT_INPUT_MISSING_FIELD_NAME_ERROR);
        }

        return CardService.newTextInput()
            .setFieldName(inputTextMeta.fieldName)
            .setTitle(inputTextMeta.title || '')
            .setValue(value || '')
            .setHint(inputTextMeta.hint || '')
            .setMultiline(inputTextMeta.multiline || false);
    }

    newTextParagraph(tpMeta = {}, value = '') {
        const newTextParagraph = CardService.newTextParagraph()
            .setText(tpMeta.text || value || '');
        if (newTextParagraph.setMaxLines && tpMeta.maxLines) {
            newTextParagraph.setMaxLines(tpMeta.maxLines);
        }
        return newTextParagraph;
    }

    newTextButton(textButtonMeta = {}, disabled = false, style = CardService.TextButtonStyle.TEXT) {
        if (!textButtonMeta.text || (!textButtonMeta.openLink && !textButtonMeta.onClick)) {
            throw new Error(EntityViewModel.CardServiceWrapper.TEXT_BUTTON_MISSING_PROPERTIES_ERROR);
        }

        const _ = this._cardService.newTextButton()
            .setText(textButtonMeta.text)
            .setDisabled(!!disabled)
            .setTextButtonStyle(textButtonMeta.style || style);

        if (textButtonMeta.openLink) {
            _.setOpenLink(this._cardService.newOpenLink().setUrl(textButtonMeta.openLink.url || ''));
        }
        else if (textButtonMeta.onClick) {
            _.setOnClickAction(textButtonMeta.onClick.functionName ? this._cardService.newAction()
                .setFunctionName(textButtonMeta.onClick.functionName || EntityViewModel.CardServiceWrapper.DEFAULT_EVENT_CLICK_FUNCTION_NAME)
                .setParameters(textButtonMeta.onClick.parameters || {}) : null
            );
        }
        else {
            throw new Error(EntityViewModel.CardServiceWrapper.TEXT_BUTTON_MISSING_PROPERTIES_ERROR);
        }
        return _;
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = EntityViewModel;
}