class BotAutomationsCard {
    static get CARD_NAME() {
        return 'botAutomationsCard';
    }

    constructor(model) {
        this._model = model;
    }

    static create(model = {}) {
        return new BotAutomationsCard(model);
    }

    build() {
        return CardService.newCardBuilder()
            .setName(BotAutomationsCard.CARD_NAME)
            .setHeader(BotAutomationsCard.Headers.main())
            .addSection(BotAutomationsCard.Sections.body())
            .setFixedFooter(BotAutomationsCard.Footers.main())
            .build();
    }
}

BotAutomationsCard.Buttons = {
    addAutomation: () =>
        CardService.newTextButton()
            .setText('Add Automation')
            .setOnClickAction(CardService.newAction()
                .setFunctionName('UiEventHandlers.AutomationReplies.onAddAutomationClick')
            ),
};

BotAutomationsCard.Sections = {
    body: (model) => CardService.newCardSection()
        .addWidget(
            BotAutomationsCard.Widgets.noAutomationsText()
        )
};

BotAutomationsCard.Widgets = {
    noAutomationsText: () =>
        CardService.newTextParagraph()
            .setText('No automations found.'),
};

BotAutomationsCard.Headers = {
    main: () =>
        CardService.newCardHeader()
            .setTitle('Bot Automations')
            .setSubtitle('Manage your bot\'s automations')
            .setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png'),
};

BotAutomationsCard.Footers = {
    main: () =>
        CardService.newFixedFooter()
            .setPrimaryButton(
                BotAutomationsCard.Buttons.addAutomation())
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BotAutomationsCard;
}
