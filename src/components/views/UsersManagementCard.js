class UsersManagementCard {
    static CARD_NAME = "usersManagementCard";

    // Add new state properties as needed
    static State = {
        users: [],
    };

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
            .setName("usersManagementCard")
            .setHeader(CardService.newCardHeader()
                .setTitle("Users Management")
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
    module.exports = { UsersManagementCard };
}