// version: 1.0.0
class BotSetupCard {
    constructor(LOCALIZE_STRING = null, indentationLevel = null, userInfo = null, botToken = null) {
        this.CARD_NAME = 'botSetupCard';
        this._models = {
            _LOCALIZE_STRINGS: LOCALIZE_STRING,
            _indentationLevel: indentationLevel,
            _userInfo: userInfo,
            _botToken: botToken
        };

        this._card = {
            _header: () => CardService.newCardHeader()
                .setTitle(this._models._LOCALIZE_STRINGS?.cards?.home?.title || '')
                .setSubtitle(this._models._LOCALIZE_STRINGS?.cards?.home?.subtitle || '')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl('https://raw.githubusercontent.com/ilanlal/ss-json-editor/refs/heads/main/assets/logo120.png')
                .setImageAltText(this._models._LOCALIZE_STRINGS?.cards?.home?.imageAltText || ''),
            _body: () => CardService.newCardSection(),
            _footer: () => CardService.newFixedFooter(),
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
            throw new Error("Localization strings are required");
        }
        if (typeof this._models._indentationLevel !== "number") {
            throw new Error("Indentation level must be a number");
        }
        if (!(this._models._userInfo instanceof UserInfo)) {
            throw new Error("User info must be an instance of UserInfo");
        }

        return this;
    }

    build() {
        return this._card._build();
    }

    static createBotSetupCard(LOCALIZE_STRINGS, indentationLevel, userInfo) {
        return new BotSetupCard(LOCALIZE_STRINGS, indentationLevel, userInfo);
    }
}
