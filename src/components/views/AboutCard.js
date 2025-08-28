/* eslint-disable no-undef */

class AboutCard {
  static get CARD_NAME() {
    return 'aboutCard';
  }

  constructor() {
    this._models = {
      packageInfo: null,
    };

    this._view = {
      header: () => CardService.newCardHeader()
        .setTitle(this._models.packageInfo.name)
        .setSubtitle(this._models.packageInfo.version)
        .setImageStyle(CardService.ImageStyle.SQUARE)
        .setImageUrl('https://raw.githubusercontent.com/ilanlal/ss-json-editor/refs/heads/main/assets/logo120.png'),
      body: () => CardService.newCardSection()
        .addWidget(CardService.newTextParagraph()
          .setText(this._models.packageInfo.content)),
    };
  }

  withPackageInfo(packageInfo) {
    this._models.packageInfo = packageInfo;
    return this;
  }

  build() {
    return CardService.newCardBuilder()
      .setName(AboutCard.CARD_NAME)
      .setHeader(this._view.header())
      .addSection(this._view.body())
      .build();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = AboutCard;
}