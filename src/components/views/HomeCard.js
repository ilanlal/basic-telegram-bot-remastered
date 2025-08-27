/* eslint-disable no-undef */
// Apps Script code for Google Workspace Add-ons
class HomeCard {
    static get CARD_NAME() {
        return 'homeCard';
    }

    static get FREE_ACTIVATION_DAYS() {
        return 90;
    }

    constructor() {
        this._models = {
            authUserInfo: null,
            telegramBotInfo: null,
        };

        this._view = {
            header: () => CardService.newCardHeader()
                .setTitle("Basic Telegram Bot")
                .setSubtitle("Manage your Telegram bot settings")
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl('https://raw.githubusercontent.com/ilanlal/ss-json-editor/refs/heads/main/assets/logo120.png'),
            //.setImageAltText('Logo of Basic Telegram Bot'),
            body: () => CardService.newCardSection()
                .addWidget(CardService.newTextParagraph()
                    .setText(`Welcome to Basic Telegram Bot! You have ${HomeCard.FREE_ACTIVATION_DAYS} days of free activation.`)
                ),
        };
    }
    withAuthUserInfo(authUserInfo) {
        if (!(authUserInfo instanceof AuthUser)) {
            throw new Error("authUserInfo must be an instance of AuthUser");
        }
        this._models.authUserInfo = authUserInfo;
        return this;
    }

    withTelegramBotInfo(telegramBotInfo) {
        if (!(telegramBotInfo instanceof TelegramBotInfo)) {
            throw new Error("telegramBotInfo must be an instance of TelegramBotInfo");
        }
        this._models.telegramBotInfo = telegramBotInfo;
        return this;
    }

    build() {
        return CardService.newCardBuilder()
            .setName(HomeCard.CARD_NAME)
            .setHeader(this._view.header())
            .addSection(this._view.body())
            .build();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = HomeCard;
}