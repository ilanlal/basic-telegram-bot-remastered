/* eslint-disable no-undef */
class HomeCard {
    static get CARD_NAME() {
        return "homeCard";
    }

    // Add new state properties as needed
    static get State() {
        return {
            /* webhookSet state properties */
            webhookSet: false,
            /* webhookUrl state properties */
            webhookUrl: "",
            /* botToken state properties */
            botTokenSet: false
        };
    }

    constructor() {
        this._state = { ...HomeCard.State };
    }

    setState(state = HomeCard.State) {
        this._state = {
            ...this._state,
            ...state
        };
        return this;
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName(HomeCard.CARD_NAME)
            .setHeader(HomeCard.Layout.HEADER(this._state))
            // Bot Setup Section
            .addSection(HomeCard.Layout.SETUP_SECTION(this._state))
            // Automated Replies Section
            .addSection(HomeCard.Layout.AUTOMATED_REPLIES_SECTION(this._state))
            .setFixedFooter(HomeCard.Layout.FIXED_FOOTER());

        return cardBuilder.build();
    }
}

HomeCard.Layout = {
    HEADER: (state = HomeCard.State) =>
        CardService.newCardHeader()
            .setTitle("Basic Telegram Bot")
            .setSubtitle("Manage your Telegram bot settings")
            //.setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageAltText('Logo of Basic Telegram Bot')
            .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png'),
    SETUP_SECTION: (state = HomeCard.State) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.BOT_INFO(state))
            .addWidget(HomeCard.Widgets.WEBHOOK_STATUS(state))
            .addWidget(HomeCard.Widgets.BOT_SETTINGS(state)),
    AUTOMATED_REPLIES_SECTION: (state = HomeCard.State) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.AUTOMATED_REPLIES(state)),
    FIXED_FOOTER: (state = HomeCard.State) =>
        CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setText("Help")
                .setOnClickAction(CardService.newAction()
                    .setFunctionName("onHelpButtonClick")))
};

HomeCard.Widgets = {
    BOT_INFO: (state = HomeCard.State) =>
        CardService.newDecoratedText()
            .setTopLabel(`${state.botTokenSet ? "🟢 Set" : "🔴 Not Set"}`)
            .setText("Bot Information")
            //.setBottomLabel(`Bot status: ${state.botTokenSet || "Not Configured"}`)
            .setButton(HomeCard.Buttons.REGISTER_NEW_BOT(state)),
    WEBHOOK_URL: (state = HomeCard.State) =>
        CardService.newDecoratedText()
            .setTopLabel("Webhook URL")
            .setText(`Webhook URL: ${state.webhookUrl || "🔴 Not Configured"}`),
    WEBHOOK_STATUS: (state = HomeCard.State) =>
        CardService.newDecoratedText()
            .setTopLabel(`${state.webhookSet ? "🟢 Set" : "🔴 Not Set"}`)
            .setText("Manage your webhook settings")
            .setButton(state.webhookSet ? HomeCard.Buttons.UNSET_WEBHOOK(state) : HomeCard.Buttons.ACTIVATE_WEBHOOK(state)),
    BOT_SETTINGS: (state = HomeCard.State) =>
        CardService.newDecoratedText()
            .setTopLabel("Bot Settings")
            .setText("Configure your bot settings")
            .setBottomLabel("Configure your bot settings")
            .setButton(HomeCard.Buttons.EDIT_BOT_INFO(state)),
    AUTOMATED_REPLIES: (state = HomeCard.State) => CardService.newDecoratedText()
        .setTopLabel("Automated Replies")
        .setText("Manage your bot's automated replies")
        .setBottomLabel("Manage your bot's automated replies")
        .setButton(HomeCard.Buttons.MANAGE_AUTOMATED_REPLIES(state))
};

HomeCard.Buttons = {
    ACTIVATE_PREMIUM: (state = HomeCard.State) => CardService.newTextButton()
        .setText("Activate Premium")
        .setOnClickAction(CardService.newAction()
            .setFunctionName("onActivatePremiumClick")),
    REGISTER_NEW_BOT: (state = HomeCard.State) => CardService.newTextButton()
        .setText("➕ Create New Bot")
        .setTextButtonStyle(state.botTokenSet ? CardService.TextButtonStyle.TEXT : CardService.TextButtonStyle.FILLED)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("EventHandlers.Home.openCreateNewBotCard")),
    EDIT_BOT_INFO: (state = HomeCard.State) => CardService.newTextButton()
        .setText("🔖 Edit Bot Info")
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("EventHandlers.Home.openBotSettingsCard")),
    MANAGE_AUTOMATED_REPLIES: (state = HomeCard.State) => CardService.newTextButton()
        .setText("🤖 Automated Replies")
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("EventHandlers.Home.openBotRepliesCard")),
    ACTIVATE_WEBHOOK: (state = HomeCard.State) => CardService.newTextButton()
        .setText("Set Webhook")
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("EventHandlers.Bot.setWebhook")),
    UNSET_WEBHOOK: (state = HomeCard.State) => CardService.newTextButton()
        .setText("Delete Webhook")
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("EventHandlers.Bot.deleteWebhook"))
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = HomeCard;
}