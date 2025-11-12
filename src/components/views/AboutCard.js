class AboutCard {
  static get CARD_NAME() {
    return 'aboutCard';
  }

  constructor(model) {
    this._model = model;

    this._view = {
      header: () => CardService.newCardHeader()
        .setTitle('🗨️ About')
        .setSubtitle('A simple Telegram bot powered by Google Apps Script.')
        .setImageStyle(CardService.ImageStyle.SQUARE)
        .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png'),
      topSection: () => CardService.newCardSection()
        .addWidget(CardService.newTextParagraph()
          .setText(`Version: ${this._model.packageInfo.version || 'N/A'} (Build ${this._model.packageInfo.build || 'N/A'})`)),
      bottomSection: () => CardService.newCardSection()
        .addWidget(CardService.newTextParagraph()
          .setText(`Author: ${this._model.packageInfo.author || 'N/A'}`))
        .addWidget(CardService.newTextParagraph()
          .setText(`Repository: <a href="${this._model.packageInfo.repository || '#'}" target="_blank">${this._model.packageInfo.repository || 'N/A'}</a>`)),
    };
  }

  static create(model = {
    packageInfo: {
      version: 'N/A',
      build: 'N/A'
    }
  }) {
    return new AboutCard(model);
  }

  build() {
    return CardService.newCardBuilder()
      .setName(AboutCard.CARD_NAME)
      .setHeader(this._view.header())
      .addSection(this._view.topSection())
      .addSection(this._view.bottomSection())
      .build();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = AboutCard;
}