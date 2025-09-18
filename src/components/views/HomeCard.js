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
            botTokenSet: false,
            /* deploymentId state properties */
            deploymentId: ""
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
            // Bot token Section
            .addSection(HomeCard.Layout.SETUP_SECTION(this._state))
            // Deployment Section
            .addSection(HomeCard.Layout.DEPLOYMENT_SECTION(this._state))
            // Webhook Section
            .addSection(HomeCard.Layout.WEBHOOK_SECTION(this._state))
            // Edit Bot Section
            .addSection(HomeCard.Layout.EDIT_BOT_SECTION(this._state))
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
            .addWidget(HomeCard.Widgets.BOT_TOKEN(state)),
    WEBHOOK_SECTION: (state = HomeCard.State) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.WEBHOOK_STATUS(state)),
    EDIT_BOT_SECTION: (state = HomeCard.State) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.BOT_SETTINGS(state)),
    DEPLOYMENT_SECTION: (state = HomeCard.State) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.DEPLOYMENT_INFO(state)),
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
    BOT_TOKEN: (state = HomeCard.State) =>
        CardService.newDecoratedText()
            .setBottomLabel(`${state.botTokenSet ? "🟢 Set" : "🔴 Not Set"}`)
            .setText("Bot Information")
            //.setBottomLabel(`Bot status: ${state.botTokenSet || "Not Configured"}`)
            .setButton(HomeCard.Buttons.REGISTER_NEW_BOT(state)),
    WEBHOOK_STATUS: (state = HomeCard.State) =>
        CardService.newDecoratedText()
            //.setWrapText(true)
            .setBottomLabel(`${state.webhookSet ? "🟢 Set" : "🔴 Not Set"}`)
            .setText("Webhook Status")
            .setButton(state.webhookSet ? HomeCard.Buttons.UNSET_WEBHOOK(state) : HomeCard.Buttons.ACTIVATE_WEBHOOK(state))
            .setTopLabel(`${state.webhookUrl || "[Not Set]"}`),
    BOT_SETTINGS: (state = HomeCard.State) =>
        CardService.newDecoratedText()
            .setWrapText(true)
            .setTopLabel("Bot Settings")
            .setText("Configure your bot settings")
            .setBottomLabel("Configure your bot settings")
            .setButton(HomeCard.Buttons.EDIT_BOT_INFO(state)),
    DEPLOYMENT_INFO: (state = HomeCard.State) =>
        CardService.newDecoratedText()
            .setWrapText(true)
            .setTopLabel(`${state.deploymentId !== "" ? state.deploymentId : "No Deployment ID"}`)
            .setText("Configure your deployment id")
            .setBottomLabel(`${state.deploymentId !== "" ? "🟢 Set" : "🔴 Not Set"}`)
            .setButton(HomeCard.Buttons.DEPLOYMENT_SETTINGS(state)),
    AUTOMATED_REPLIES: (state = HomeCard.State) => CardService.newDecoratedText()
        .setWrapText(true)
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
        .setText("➕ New")
        .setTextButtonStyle(state.botTokenSet ? CardService.TextButtonStyle.TEXT : CardService.TextButtonStyle.FILLED)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("UiEventHandlers.Home.openCreateNewBotCard")),
    EDIT_BOT_INFO: (state = HomeCard.State) => CardService.newTextButton()
        .setText("🔖 Edit Bot Info")
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("UiEventHandlers.Home.openBotSettingsCard")),
    MANAGE_AUTOMATED_REPLIES: (state = HomeCard.State) => CardService.newTextButton()
        .setText("🤖 Automated Replies")
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("UiEventHandlers.Home.openBotRepliesCard")),
    ACTIVATE_WEBHOOK: (state = HomeCard.State) => CardService.newTextButton()
        .setText("🟢 Activate Webhook")
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("UiEventHandlers.Bot.setWebhook")),
    UNSET_WEBHOOK: (state = HomeCard.State) => CardService.newTextButton()
        .setText("🔴 Delete Webhook")
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("UiEventHandlers.Bot.deleteWebhook")),
    DEPLOYMENT_SETTINGS: (state = HomeCard.State) => CardService.newTextButton()
        .setText("🚀 Deployment Settings")
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName("UiEventHandlers.Home.openDeploymentSettingsCard"))
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = HomeCard;
}