/* eslint-disable no-undef */
// version: 1.0.0
class BotCreateCard {
    static get INPUTS() {
        return {
            'BOT_TOKEN': 'BOT_TOKEN'
        };
    }

    static get CARD_NAME() {
        return 'botSetupCard';
    }

    constructor() {
        this._models = {
            _authUserInfo: null,
            _botToken: '',
            _telegramBotInfo: null
        };

        this._card = {
            _header: () => CardService.newCardHeader()
                .setTitle("Welcome to Basic Telegram Bot!")
                .setSubtitle("Customize your bot settings below:")
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png')
                .setImageAltText('Logo of Basic Telegram Bot'),
            _body: () => CardService.newCardSection()
                // add card with text input for bot token
                .addWidget(CardService.newTextInput()
                    .setFieldName(BotCreateCard.INPUTS.BOT_TOKEN)
                    .setTitle("Bot Token")
                    .setHint("Enter your bot token here")
                ),
            _footer: () => CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText(" 💾 Save")
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('EventHandlers.Bot.saveNewBotToken')
                    )
                )
                .setSecondaryButton(CardService.newTextButton()
                    .setText(" ❌ Cancel")
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('EventHandlers.back')
                    )
                )
        };
    }

    withAuthUserInfo(authUserInfo) {
        if (!(authUserInfo instanceof AuthUser)) {
            throw new Error("authUserInfo must be an instance of AuthUser");
        }
        this._models._authUserInfo = authUserInfo;
        return this;
    }

    withTelegramBotInfo(telegramBotInfo) {
        if (!(telegramBotInfo instanceof TelegramBotInfo)) {
            throw new Error("telegramBotInfo must be an instance of TelegramBotInfo");
        }
        this._models._telegramBotInfo = telegramBotInfo;
        return this;
    }

    newCardBuilder() {
        return CardService.newCardBuilder()
            .setName(BotCreateCard.CARD_NAME)
            .setHeader(this._card._header())
            .addSection(this._card._body())
            .setFixedFooter(this._card._footer())
    }
}

// --- IGNORE (for Node.js support) --- //
if (typeof module !== "undefined" && module.exports) {
    module.exports = BotCreateCard;
}