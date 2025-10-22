require('../../../tests');
const EntityViewModel = require('./EntityViewModel');
describe('EntityViewModel.cardWrapper', () => {
    it('should create a new instance of CardWrapper', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        expect(viewModel.cardWrapper).toBeDefined();
    });
});

describe('EntityViewModel.cardWrapper widgets', () => {
    //newTextButton
    it('should create a newTextButton widget with correct text', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const textButtonMeta = {
            text: 'Click Me',
            functionName: 'onClick',
            parameters: {
                action: 'click'
            }
        };
        const textButton = viewModel.cardWrapper.newTextButton(textButtonMeta);
        expect(textButton).toBeDefined();
        const data = textButton.getData();
        expect(data).toBeDefined();
        expect(data.textButton.text).toBe(textButtonMeta.text);
        expect(data.textButton.onClick.action.actionMethodName).toBe(textButtonMeta.functionName);
        expect(data.textButton.onClick.action.parameters).toEqual(textButtonMeta.parameters);
    });

    it('should create a newTextParagraph widget with correct text', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const textParagraphMeta = {
            text: 'This is a test paragraph'
        };
        const textParagraph = viewModel.cardWrapper.newTextParagraph(textParagraphMeta);
        expect(textParagraph).toBeDefined();
        const data = textParagraph.getData();
        expect(data).toBeDefined();
        expect(data.text).toBe(textParagraphMeta.text);
    });

    it('should create a newTextInput widget with correct placeholder', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const textInputMeta = {
            id: 'testInput',
            title: 'Test Input',
            hint: 'Enter test value',
            value: 'Test Value',
            type: 'string'
        };
        const textInput = viewModel.cardWrapper.newTextInput(textInputMeta);
        expect(textInput).toBeDefined();
        let data = textInput.getData();
        expect(data).toBeDefined();
        //console.log(JSON.stringify(data, null, 2));
    });

    // newDecoratedText
    it('should create a newDecoratedText widget with correct text and labels', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const decoratedTextMeta = {
            text: 'Main Text',
            topLabel: 'Top Label',
            bottomLabel: 'Bottom Label',
        };
        const decoratedText = viewModel.cardWrapper.newDecoratedText(decoratedTextMeta);
        expect(decoratedText).toBeDefined();
        const data = decoratedText.getData();
        expect(data).toBeDefined();
        expect(data.text).toBe(decoratedTextMeta.text);
        expect(data.topLabel).toBe(decoratedTextMeta.topLabel);
        expect(data.bottomLabel).toBe(decoratedTextMeta.bottomLabel);
    });
});

describe('EntityViewModel.cardWrapper header', () => {
    it('should create a new header with the correct data', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const headerMeta = {
            title: 'Test Card',
            subTitle: 'This is a test card',
            imageUrl: 'https://example.com/test_card_image.png',
            imageStyle: CardService.ImageStyle.SQUARE,
            imageAltText: 'Test Card Image'
        };
        const header = viewModel.cardWrapper.newCardHeader(headerMeta);
        expect(header).toBeDefined();
        const data = header.getData();
        expect(data).toBeDefined();
        expect(data.title).toBe(headerMeta.title);
        expect(data.subTitle).toBe(headerMeta.subTitle);
        expect(data.imageUrl).toBe(headerMeta.imageUrl);
        expect(data.imageStyle).toBe(headerMeta.imageStyle);
        expect(data.imageAltText).toBe(headerMeta.imageAltText);
    });
});

describe('EntityViewModel.cardWrapper fixedFooter', () => {
    it('should create a fixed footer with a primary button', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const footerMeta = {
            primaryButton: {
                text: 'Submit',
                functionName: 'onSubmit',
                parameters: {
                    id: 'submitAction'
                }
            }
        };
        const fixedFooter = viewModel.cardWrapper.newFixedFooter(footerMeta);
        expect(fixedFooter).toBeDefined();
        let data = fixedFooter.getData();
        expect(data).toBeDefined();
        expect(data.primaryButton).toBeDefined();
        data = data.primaryButton.getData();
        expect(data.textButton.text).toBe(footerMeta.primaryButton.text);
        expect(data.textButton.onClick.action.actionMethodName).toBe(footerMeta.primaryButton.functionName);
        expect(data.textButton.onClick.action.parameters).toEqual(footerMeta.primaryButton.parameters);
        //console.log(JSON.stringify(data, null, 2));
    });

    it('should throw an error if primary button is not defined', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const footerMeta = {
            // primaryButton is missing
        };
        expect(() => {
            viewModel.cardWrapper.newFixedFooter(footerMeta);
        }).toThrow(EntityViewModel.CardServiceWrapper.FIXED_FOOTER_BUTTON_NOT_DEFINED_ERROR);
    });

});