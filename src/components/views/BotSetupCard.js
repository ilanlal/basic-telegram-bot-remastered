// version: 1.0.0
class BotSetupCard {
    static get INPUTS() {
        return {
            'BOT_TOKEN': 'BOT_TOKEN'
        };
    }

    constructor(LOCALIZE_STRING = null, authUserInfo = null) {
        this.CARD_NAME = 'botSetupCard';
        this._models = {
            _LOCALIZE_STRINGS: LOCALIZE_STRING,
            _authUserInfo: authUserInfo,
            _botToken: BotSetupCard.INPUTS.BOT_TOKEN,
        };

        this._card = {
            _header: () => CardService.newCardHeader()
                .setTitle(this._models._LOCALIZE_STRINGS?.cards?.home?.title || '')
                .setSubtitle(this._models._LOCALIZE_STRINGS?.cards?.home?.subtitle || '')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl('https://raw.githubusercontent.com/ilanlal/ss-json-editor/refs/heads/main/assets/logo120.png')
                .setImageAltText(this._models._LOCALIZE_STRINGS?.cards?.home?.imageAltText || ''),
            _body: () => CardService.newCardSection()
                // add card with text input for bot token
                .addWidget(CardService.newTextInput()
                    .setFieldName(BotSetupCard.INPUTS.BOT_TOKEN)
                    .setTitle(this._models._LOCALIZE_STRINGS?.cards?.botSetup?.title || '')
                    .setHint(this._models._LOCALIZE_STRINGS?.cards?.botSetup?.hint || '')
                ),
            _footer: () => CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText(this._models._LOCALIZE_STRINGS?.action?.save || ' 💾 Save')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('onNewBotToken')
                    )
                )
                .setSecondaryButton(CardService.newTextButton()
                    .setText(this._models._LOCALIZE_STRINGS?.action?.cancel || ' ❌ Cancel')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('onCancelBotSetup')
                    )
                ),
            _build: () => CardService.newCardBuilder()
                .setName(this.CARD_NAME)
                .setHeader(this._card._header())
                .addSection(this._card._body())
                .setFixedFooter(this._card._footer())
                .build()
        };
    }

    validate() {
        if (!this._models._LOCALIZE_STRINGS) {
            throw new Error("Localization strings object is required");
        }

        if (!(this._models._authUserInfo instanceof AuthUser)) {
            throw new Error("User info must be an instance of AuthUser");
        }

        return this;
    }

    build() {
        return this._card._build();
    }

    static createBotSetupCard(LOCALIZE_STRINGS, authUserInfo) {
        return new BotSetupCard(LOCALIZE_STRINGS, authUserInfo);
    }
}