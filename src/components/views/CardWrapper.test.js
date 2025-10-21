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
        console.log(JSON.stringify(data, null, 2));
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
            hint: 'Enter some text here',
            value: 'Default Value',
            type: 'string'
        };
        const textInput = viewModel.cardWrapper.newTextInput(textInputMeta);
        expect(textInput).toBeDefined();
        let data = textInput.getData();
        expect(data).toBeDefined();
        console.log(JSON.stringify(data, null, 2));
    });

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

    it('should create a fixed footer with a primary button', () => {
        const viewModel = EntityViewModel.create({
            cardService: CardService,
            activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet()
        });
        const footerMeta = {
            primaryButton: {
                textButton: {
                    text: 'Submit',
                    functionName: 'onSubmit',
                    parameters: {
                        id: 'submitAction'
                    }
                }
            }
        };
        const fixedFooter = viewModel.cardWrapper.newFixedFooter(footerMeta);
        expect(fixedFooter).toBeDefined();
        let data = fixedFooter.getData();
        expect(data).toBeDefined();
        expect(data.primaryButton).toBeDefined();
        data = data.primaryButton.getData();
        console.log(JSON.stringify(data, null, 2));
    });
});