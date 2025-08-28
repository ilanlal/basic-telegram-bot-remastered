/* eslint-disable no-undef */
class AccountCard {
    static get CARD_NAME() {
        return 'accountCard';
    }

    constructor() {
        this._models = {
            userInfo: new AuthUser(),
            FREE_ACTIVATION_DAYS: 0
        };
    }

    withFreeActivationDays(days) {
        this._models.FREE_ACTIVATION_DAYS = days;
        return this;
    }

    withUserInfo(userInfo) {
        this._models.userInfo = userInfo;
        return this;
    }

    isPremium() {
        if (!(this._models.userInfo && this._models.userInfo instanceof AuthUser)) {
            return false;
        }
        return this._models.userInfo?.getUserLicense()?.isActive?.() || false;
    }

    build() {
        const userInfo = this._models.userInfo;
        const isPremium = this.isPremium();
        const header = CardService.newCardHeader()
            .setTitle("Account Information")
            .setSubtitle(`${isPremium ? "Premium User" : "Free User"}`)
            .setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageUrl('https://raw.githubusercontent.com/ilanlal/ss-json-editor/refs/heads/main/assets/logo120.png');
        //.setImageAltText('Logo of Basic Telegram Bot');

        const body = CardService.newCardSection()
            .addWidget(CardService.newTextParagraph()
                .setText(`Hello`))
            .addWidget(CardService.newTextParagraph()
                .setText(`You have ${this._models.FREE_ACTIVATION_DAYS} days of free activation.`))
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