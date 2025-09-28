/* eslint-disable no-undef */
// version: 1.0.0
class NewBotTokenCard {
    static get INPUTS() {
        return {
            'BOT_TOKEN': 'BOT_TOKEN'
        };
    }

    static get TOKEN_INPUT_ID() {
        return 'BOT_TOKEN';
    }

    static get CARD_NAME() {
        return 'botSetupCard';
    }

    constructor(model = {}) {
        this._model = model;

        this._card = {
            _header: () => CardService.newCardHeader()
                .setTitle('Welcome to Basic Telegram Bot!')
                .setSubtitle('Customize your bot settings below:')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png')
                .setImageAltText('Logo of Basic Telegram Bot'),
            _body: () => CardService.newCardSection()
                // add card with text input for bot token
                .addWidget(CardService.newTextInput()
                    .setFieldName(NewBotTokenCard.TOKEN_INPUT_ID)
                    .setTitle('Bot Token')
                    .setHint('Enter your token from BotFather here')
                ),
            _footer: () => CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText(' 💾 Save')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.Bot.saveNewBotToken')
                    )
                )
                .setSecondaryButton(CardService.newTextButton()
                    .setText(' ❌ Cancel')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.back')
                    )
                )
        };
    }

    static create(model = {}) {
        return new NewBotTokenCard(model);
    }

    build() {
        return CardService.newCardBuilder()
            .setName(NewBotTokenCard.CARD_NAME)
            .setHeader(this._card._header())
            .addSection(this._card._body())
            .setFixedFooter(this._card._footer())
            .build();
    }
}

// --- IGNORE (for Node.js support) --- //
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewBotTokenCard;
}