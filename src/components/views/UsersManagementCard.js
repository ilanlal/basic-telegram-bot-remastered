class UsersManagementCard {
    static get CARD_NAME() {
        return "usersManagementCard";
    }

    constructor(model) {
        this._model = model || {};
        this._state = {
            users: [],
        };
    }

    static create(model) {
        return new UsersManagementCard(model);
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName(UsersManagementCard.CARD_NAME)
            .setHeader(CardService.newCardHeader()
                .setTitle("Users Management")
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl("https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png")
                .setSubtitle("Manage your Telegram bot users"))
            .addSection(CardService.newCardSection()
                .addWidget(CardService.newTextParagraph()
                    .setText("This is where you can manage your bot users.")))
            .setFixedFooter(CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText(" ❌ Back")
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.back')
                    )
                ));

        return cardBuilder.build();
    }
}// --- IGNORE (for Node.js support) --- //

if (typeof module !== "undefined" && module.exports) {
    module.exports = UsersManagementCard;
}