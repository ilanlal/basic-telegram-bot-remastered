class MockCardService {
    constructor() {
        this.cards = [];
    }

    newAction() {
        return {
            setFunctionName: (functionName) => this
        };
    }

    newTextButton() {
        return {
            setText: (text) => this,
            setOnClickAction: (action) => this,
            setDisabled: (disabled) => this
        };
    }

    newCardHeader() {
        return {
            setTitle: (title) => this,
            setSubtitle: (subtitle) => this,
            setImageUrl: (imageUrl) => this,
            setImageAltText: (altText) => this,
            setImageStyle: (style) => this
        };
    }

    newCardSection() {
        return {
            addWidget: (widget) => this,
            addDecoratedText: (decoratedText) => this
        };
    }

    newTextInput() {
        return {
            setFieldName: (fieldName) => this,
            setTitle: (title) => this,
            setHint: (hint) => this,
            setValue: (value) => this
        };
    }

    newFixedFooter() {
        return {
            setPrimaryButton: (button) => this,
            setSecondaryButton: (button) => this
        };
    }

    newCardBuilder() {
        return {
            setName: (name) => this,
            addSection: (section) => this,
            setHeader: (header) => this,
            setFixedFooter: (footer) => this,
            build: () => this
        };
    }
}

class MockCardServiceFactory {
    constructor() {
        this.cardService = new MockCardService();
    }

    getCardService() {
        return this.cardService;
    }

    static newFactory() {
        return new MockCardServiceFactory();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MockCardService,
        MockCardServiceFactory
    };
}