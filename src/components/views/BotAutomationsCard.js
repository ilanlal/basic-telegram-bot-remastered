/* eslint-disable no-undef */
class BotAutomationsCard {
   static get CARD_NAME() {
        return 'botAutomationsCard';
    }

    constructor(model) {
        this._model = model || {};
    }

    static create(model = {}) {
        return new BotAutomationsCard(model);
    }

    build() {
        return CardService.newCardBuilder()
            .setName(BotAutomationsCard.CARD_NAME)
            .setHeader(this._header())
            .addSection(this._body())
            .setFixedFooter(this._footer())
            .build();
    }

    _header() {
        return CardService.newCardHeader()
            .setTitle("Bot Automations")
            .setSubtitle("Manage your bot automations");
    }

    _body() {
        return CardService.newCardSection()
            .addWidget(CardService.newTextParagraph().setText("No automations found."));
    }

    _footer() {
        return CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setText("Add Automation")
                .setOnClickAction(CardService.newAction()
                    .setFunctionName("onAddAutomation")
                )
            )
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = BotAutomationsCard;
}
