/* eslint-disable no-undef */
class BotAutomationsCard {
   static get CARD_NAME() {
        return 'botAutomationsCard';
    }

    withBotInfo(botInfo) {
        this._data.botInfo = botInfo;
        return this;
    }

    addReply(reply) {
        if (!reply || typeof reply !== 'object') {
            throw new Error("Invalid reply");
        }
        this._data.replies.push(reply);
        return this;
    }

    constructor() {
        this._data = {
            replies: []
        };
    }

    newCardBuilder() {
        if (!this._data.botInfo) {
            throw new Error("Bot info is not set");
        }
        return CardService.newCardBuilder()
            .setName(BotAutomationsCard.CARD_NAME)
            .setHeader(this._header())
            .addSection(this._body())
            .setFixedFooter(this._footer());
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
