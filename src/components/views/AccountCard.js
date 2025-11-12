/* eslint-disable no-undef */
class AccountCard {
    static get CARD_NAME() {
        return 'accountCard';
    }

    constructor(model) {
        this._model = model || { FREE_ACTIVATION_DAYS: 7, userInfo: null };
    }

    static create(model = {
        FREE_ACTIVATION_DAYS: 7,
        userInfo: null
    }) {
        return new AccountCard(model);
    }

    isPremium() {
        if (!(this._model.userInfo && this._model.userInfo instanceof AuthUser)) {
            return false;
        }
        return this._model.userInfo?.getUserLicense()?.isActive?.() || false;
    }

    build() {
        const userInfo = this._model.userInfo;
        const isPremium = this.isPremium();
        const header = CardService.newCardHeader()
            .setTitle("Account Information")
            .setSubtitle(`${isPremium ? "Premium User" : "Free User"}`)
            .setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png');
        //.setImageAltText('Logo of Basic Telegram Bot');

        const body = CardService.newCardSection()
            .addWidget(CardService.newTextParagraph()
                .setText(`Hello`))
            .addWidget(CardService.newTextParagraph()
                .setText(`You have ${this._model.FREE_ACTIVATION_DAYS} days of free activation.`))
            .addWidget(CardService.newTextParagraph()
                .setText(`Account Type: ${isPremium ? "Premium" : "Free"}`));

        return CardService.newCardBuilder()
            .setName(AccountCard.CARD_NAME)
            .setHeader(header)
            .addSection(body)
            .build();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = AccountCard;
}