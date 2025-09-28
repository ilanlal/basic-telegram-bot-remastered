/* eslint-disable no-undef */
class HomeCard {
    static get CARD_NAME() {
        return 'homeCard';
    }

    get state() {
        if (!this._model) {
            return null;
        }
        return this._model.state;
    }

    constructor(model) {
        this._model = model || null;
    }

    static create(model = null) {
        if (!(model instanceof SetupFlow)) {
            throw new Error('model instance must be an instance of SetupFlow');
        }
        return new HomeCard(model);
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName(HomeCard.CARD_NAME)
            .setHeader(HomeCard.Layout.HEADER(this.state))
            // Setup Section
            .addSection(HomeCard.Layout.SETUP_SECTION(this.state))
            // Edit Bot Section
            .addSection(HomeCard.Layout.EDIT_BOT_SECTION(this.state))
            // Automated Replies Section
            .addSection(HomeCard.Layout.AUTOMATED_REPLIES_SECTION(this.state))
            // Footer
            .setFixedFooter(HomeCard.Layout.FIXED_FOOTER(this.state));

        return cardBuilder.build();
    }
};

HomeCard.LayoutBuilder = class {
    constructor() {
        this._sections = [];
    }

    withState(state) {
        this._state = state;
        return this;
    }
};

HomeCard.Layout = {
    HEADER: (state) =>
        CardService.newCardHeader()
            .setTitle('Basic Telegram Bot')
            .setSubtitle('Manage your Telegram bot settings')
            //.setImageStyle(CardService.ImageStyle.SQUARE)
            .setImageAltText('Logo of Basic Telegram Bot')
            .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png'),
    SETUP_SECTION: (state = null) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.BOT_TOKEN(state))
            .addWidget(HomeCard.Widgets.DEPLOYMENT_INFO(state))
            .addWidget(HomeCard.Widgets.WEBHOOK_STATUS(state)),
    WEBHOOK_SECTION: (state = null) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.WEBHOOK_STATUS(state)),
    EDIT_BOT_SECTION: (state = null) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.BOT_SETTINGS(state)),
    DEPLOYMENT_SECTION: (state = null) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.DEPLOYMENT_INFO(state)),
    AUTOMATED_REPLIES_SECTION: (state = null) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.AUTOMATED_REPLIES(state)),
    USER_SECTION: (state = null) =>
        CardService.newCardSection()
            .addWidget(HomeCard.Widgets.USERS_WIDGET(state)),
    FIXED_FOOTER: (state = null) =>
        CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setText('Help')
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('onHelpButtonClick')))
};

HomeCard.Widgets = {
    BOT_TOKEN: (state = null) =>
        CardService.newDecoratedText()
            .setBottomLabel(`${state.botTokenSet ? '🟢 Set' : '🔴 Not Set'}`)
            .setText('Bot Token')
            .setTopLabel('Bot Information')
            //.setBottomLabel(`Bot status: ${state.botTokenSet || 'Not Configured'}`)
            .setButton(HomeCard.Buttons.REGISTER_NEW_BOT(state)),
    WEBHOOK_STATUS: (state = null) =>
        CardService.newDecoratedText()
            //.setWrapText(true)
            .setBottomLabel(`${state.webhookSet ? '🟢 Set' : '🔴 Not Set'}`)
            .setText('Webhook Status')
            .setButton(state.webhookSet ? HomeCard.Buttons.UNSET_WEBHOOK(state) : HomeCard.Buttons.ACTIVATE_WEBHOOK(state))
            .setTopLabel(`${state.webhookUrl || '[Not Set]'}`),
    BOT_SETTINGS: (state = null) =>
        CardService.newDecoratedText()
            .setWrapText(true)
            .setTopLabel('Bot Settings')
            .setText('Configure your bot settings')
            .setBottomLabel('Configure your bot settings')
            .setButton(HomeCard.Buttons.EDIT_BOT_INFO(state)),
    DEPLOYMENT_INFO: (state = null) =>
        CardService.newDecoratedText()
            .setWrapText(true)
            .setTopLabel(`${state.deploymentId !== '' ? state.deploymentId : 'No Deployment ID'}`)
            .setText('Configure your deployment id')
            .setBottomLabel(`${state.deploymentId !== '' ? '🟢 Set' : '🔴 Not Set'}`)
            .setButton(HomeCard.Buttons.DEPLOYMENT_SETTINGS(state)),
    AUTOMATED_REPLIES: (state = null) => CardService.newDecoratedText()
        .setWrapText(true)
        .setTopLabel('Automated Replies')
        .setText('Manage your bot\'s automated replies')
        .setBottomLabel('Manage your bot\'s automated replies')
        .setButton(HomeCard.Buttons.MANAGE_AUTOMATED_REPLIES(state)),
    USERS_WIDGET: (state = null) =>
        CardService.newDecoratedText()
            .setWrapText(true)
            .setTopLabel('Bot Users')
            .setText('Manage your bot\'s users')
            .setBottomLabel('Manage your bot\'s users')
            .setButton(CardService.newTextButton()
                .setText('👥 Users')
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('UiEventHandlers.Home.openUsersManagementCard')))
};

HomeCard.Buttons = {
    ACTIVATE_PREMIUM: (state = null) => CardService.newTextButton()
        .setText('Activate Premium')
        .setOnClickAction(CardService.newAction()
            .setFunctionName('onActivatePremiumClick')),
    REGISTER_NEW_BOT: (state = null) => CardService.newTextButton()
        .setText('➕ New')
        .setTextButtonStyle(state.botTokenSet ? CardService.TextButtonStyle.TEXT : CardService.TextButtonStyle.FILLED)
        .setOnClickAction(CardService.newAction()
            .setFunctionName('UiEventHandlers.Home.openCreateNewBotCard')),
    EDIT_BOT_INFO: (state = null) => CardService.newTextButton()
        .setText('🔖 Edit Bot Info')
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName('UiEventHandlers.Home.openBotSettingsCard')),
    MANAGE_AUTOMATED_REPLIES: (state = null) => CardService.newTextButton()
        .setText('🤖 Automated Replies')
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName('UiEventHandlers.Home.openBotRepliesCard')),
    ACTIVATE_WEBHOOK: (state = null) => CardService.newTextButton()
        .setText('🟢 Activate Webhook')
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName('UiEventHandlers.Bot.setWebhook')),
    UNSET_WEBHOOK: (state = null) => CardService.newTextButton()
        .setText('🔴 Delete Webhook')
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName('UiEventHandlers.Bot.deleteWebhook')),
    DEPLOYMENT_SETTINGS: (state = null) => CardService.newTextButton()
        .setText('🚀 Deployment Settings')
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName('UiEventHandlers.Home.openDeploymentSettingsCard'))
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomeCard;
}