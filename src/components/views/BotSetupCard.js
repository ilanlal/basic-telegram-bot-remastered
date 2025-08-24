// version: 1.0.0
if (typeof require !== 'undefined' && require) {
    TelegramBotInfo = require('../models/TelegramBotInfo.js').TelegramBotInfo;
    AuthUser = require('../models/AuthUser.js').AuthUser;
}

class BotSetupCard {
    static get INPUTS() {
        return {
            'BOT_TOKEN': 'BOT_TOKEN'
        };
    }

    constructor(LOCALIZE_STRING = null, _cardService = null, cardService = null, authUserInfo = null, telegramBotInfo = null) {
        if (!_cardService) {
            throw new Error("CardService is required");
        }
        if (!LOCALIZE_STRING || typeof LOCALIZE_STRING !== 'object') {
            throw new Error("LOCALIZE_STRING must be a valid object");
        }
        this.CARD_NAME = 'botSetupCard';
        this._cardService = _cardService;
        this._models = {
            _LOCALIZE_STRINGS: LOCALIZE_STRING,
            _authUserInfo: authUserInfo,
            _botToken: BotSetupCard.INPUTS.BOT_TOKEN,
            _telegramBotInfo: telegramBotInfo
        };

        this._card = {
            _header: () => this._cardService.newCardHeader()
                .setTitle(this._models._LOCALIZE_STRINGS?.cards?.home?.title || '')
                .setSubtitle(this._models._LOCALIZE_STRINGS?.cards?.home?.subtitle || '')
                .setImageStyle(this._cardService.ImageStyle.SQUARE)
                .setImageUrl('https://raw.githubusercontent.com/ilanlal/ss-json-editor/refs/heads/main/assets/logo120.png')
                .setImageAltText(this._models._LOCALIZE_STRINGS?.cards?.home?.imageAltText || ''),
            _body: () => this._cardService.newCardSection()
                // add card with text input for bot token
                .addWidget(this._cardService.newTextInput()
                    .setFieldName(BotSetupCard.INPUTS.BOT_TOKEN)
                    .setTitle(this._models._LOCALIZE_STRINGS?.cards?.botSetup?.title || '')
                    .setHint(this._models._LOCALIZE_STRINGS?.cards?.botSetup?.hint || '')
                ),
            _footer: () => this._cardService.newFixedFooter()
                .setPrimaryButton(this._cardService.newTextButton()
                    .setText(this._models._LOCALIZE_STRINGS?.action?.save || ' 💾 Save')
                    .setOnClickAction(this._cardService.newAction()
                        .setFunctionName('onNewBotToken')
                    )
                )
                .setSecondaryButton(this._cardService.newTextButton()
                    .setText(this._models._LOCALIZE_STRINGS?.action?.cancel || ' ❌ Cancel')
                    .setOnClickAction(this._cardService.newAction()
                        .setFunctionName('onCancelBotSetup')
                    )
                ),
            _build: () => this._cardService.newCardBuilder()
                .setName(this.CARD_NAME)
                .setHeader(this._card._header())
                .addSection(this._card._body())
                .setFixedFooter(this._card._footer())
                .build()
        };
    }

    build() {
        return this._card._build();
    }
}

class BotCardFactory {
    constructor() {
        this._LOCALIZE_STRINGS = null;
        /** @type {AuthUser} */
        this._authUserInfo = null;
        /** @type {TelegramBotInfo} */
        this._telegramBotInfo = null;
        this._cardService = null;
    }
    withCardService(cardService) {
        this._cardService = cardService;
        return this;
    }

    withAuthUserInfo(authUserInfo) {
        if (!(authUserInfo instanceof AuthUser)) {
            throw new Error("authUserInfo must be an instance of AuthUser");
        }
        this._authUserInfo = authUserInfo;
        return this;
    }
    withTelegramBotInfo(telegramBotInfo) {
        if (!(telegramBotInfo instanceof TelegramBotInfo)) {
            throw new Error("telegramBotInfo must be an instance of TelegramBotInfo");
        }
        this._telegramBotInfo = telegramBotInfo;
        return this;
    }
    withLocalization(LOCALIZE_STRINGS) {
        if (!LOCALIZE_STRINGS || typeof LOCALIZE_STRINGS !== 'object') {
            throw new Error("LOCALIZE_STRINGS must be a valid object");
        }
        this._LOCALIZE_STRINGS = LOCALIZE_STRINGS;
        return this;
    }


    build() {
        return new BotSetupCard(this._LOCALIZE_STRINGS, this._cardService, this._authUserInfo);
    }

    static newBotCardFactory() {
        return new BotCardFactory();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        BotCardFactory,
        BotSetupCard
    };
}