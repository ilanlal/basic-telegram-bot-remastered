class BotHomeCard {
      constructor() {
        this.localization = AppManager.getLocalizationResources();
        this.indentationLevel = UserStore.Constants.DEFAULT_INDENT_SPACES;
        this.FREE_ACTIVATION_DAYS = Static_Resources.parameters.freeActivationDays;
    }

    getUserInfo() {
        return this.userInfo;
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo;
        return this;
    }

    setLocalization(localization) {
        this.localization = localization;
        return this;
    }

    static newBotHomeCard() {
        return new BotHomeCard();
    }

     newCardBuilder() {
        // Create a new card builder
        const cardBuilder = CardService.newCardBuilder()
            .setName(Static_Resources.resources.homeCardName)
            // Set the card header
            .setHeader(this.getHeader());
        
        return cardBuilder;
    }

    getHeader() {
        return CardService.newCardHeader()
            .setTitle(this.localization.cards.home.title)
            .setSubtitle(this.localization.cards.home.subtitle)
            .setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageUrl('https://raw.githubusercontent.com/ilanlal/ss-json-editor/refs/heads/main/assets/logo120.png')
            .setImageAltText(this.localization.cards.home.imageAltText);
    }
}
