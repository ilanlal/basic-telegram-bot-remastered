class SetMyChatIdCard {
    constructor(model) {
        this._model = model || { deploymentId: '' }; 
    }

    static create(model = {}) {
        return new SetMyChatIdCard(model);
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName("SetMyChatIdCard")
            .setHeader(CardService.newCardHeader()
                .setTitle("Setup My Chat ID")
                .setSubtitle("Set up a chat 'id' for your bot"))
            .addSection(CardService.newCardSection()
                .addWidget(CardService.newTextInput()
                    .setFieldName("chatId")
                    .setTitle("Chat ID")
                    .setValue(this._model.chatId)))
            .setFixedFooter(CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText(" 💾 Save")
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.Home.saveMyChatId')
                    )
                )
                .setSecondaryButton(CardService.newTextButton()
                    .setText(" ❌ Cancel")
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.back')
                    )
                ));

        return cardBuilder.build();
    }
}// --- IGNORE (for Node.js support) --- //

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SetMyChatIdCard };
}
