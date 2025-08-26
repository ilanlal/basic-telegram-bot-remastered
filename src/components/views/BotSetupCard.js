// version: 1.0.0

/* eslint-disable no-undef */

// --- IGNORE (for Node.js support) --- //
if (typeof require !== 'undefined' && require) {
    TelegramBotInfo = require('../models/TelegramBotInfo.js').TelegramBotInfo;
    AuthUser = require('../models/AuthUser.js').AuthUser;
    CardService = require('gas-mock-globals/src/card/CardService.js');
}

class BotSetupCard {
    static get INPUTS() {
        return {
            'BOT_TOKEN': 'BOT_TOKEN'
        };
    }

    constructor() {
        this._CARD_NAME = 'botSetupCard';
        this._cardService = CardService;
        this._models = {
            _LOCALIZE_STRINGS: null,
            _authUserInfo: null,
            _botToken: '',
            _telegramBotInfo: null
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

    withLocalization(LOCALIZE_STRINGS) {
        if (!LOCALIZE_STRINGS || typeof LOCALIZE_STRINGS !== 'object') {
            throw new Error("LOCALIZE_STRINGS must be a valid object");
        }
        this._models._LOCALIZE_STRINGS = LOCALIZE_STRINGS;
        return this;
    }

    build() {
        return this._cardService.newCardBuilder()
            .setName(this._CARD_NAME)
            .setHeader(this._card._header())
            .addSection(this._card._body())
            .setFixedFooter(this._card._footer())
            .build();
    }
}

class BotSetupCardFactory {
    constructor() {
    }

    build() {
        return new BotSetupCard();
    }

    static newBotSetupCard() {
        return new BotSetupCardFactory();
    }
}

// --- IGNORE (for Node.js support) --- //
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        BotSetupCardFactory,
        BotSetupCard
    };
}