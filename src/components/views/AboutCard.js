/* eslint-disable no-undef */

class AboutCard {
  static get CARD_NAME() {
    return 'aboutCard';
  }

  constructor(model) {
    this._model = model;

    this._view = {
      header: () => CardService.newCardHeader()
        .setTitle(this._model.packageInfo.name || 'About')
        .setSubtitle(this._model.packageInfo.version || '')
        .setImageStyle(CardService.ImageStyle.SQUARE)
        .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png'),
      body: () => CardService.newCardSection()
        .addWidget(CardService.newTextParagraph()
          .setText(this._model.packageInfo.version || '')),
    };
  }

  static create(model = {
    packageInfo: {
      name: 'About Card',
      version: '1.0.0',
      build: 'N/A'
    }
  }) {
    return new AboutCard(model);
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