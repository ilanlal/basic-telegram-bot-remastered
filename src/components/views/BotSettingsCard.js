/* eslint-disable no-undef */
class BotSettingsCard {
    static get CARD_NAME() {
        return 'botSettingsCard';
    }

    constructor(model) {
        this._model = model || {};
    }

    static create(model) {
        return new BotSettingsCard(model);
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName(BotSettingsCard.CARD_NAME)
            .setHeader(CardService.newCardHeader()
                .setTitle('Bot Settings')
                .setSubtitle('Configure your bot settings'))
            .addSection(CardService.newCardSection()
                .addWidget(CardService.newTextInput()
                    .setFieldName('BOT_NAME')
                    .setTitle('Bot Name')
                    .setValue(this._model.BOT_NAME || '')))
            .setFixedFooter(CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText(' 💾 Save')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.Bot.saveMyBotInfo')
                    )
                )
                .setSecondaryButton(CardService.newTextButton()
                    .setText(' ❌ Cancel')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.back')
                    )
                ));

        return cardBuilder.build();
    }
}

// --- IGNORE (for Node.js support) --- //
if (typeof module !== "undefined" && module.exports) {
    module.exports = BotSettingsCard;
}