class BotSetupCard {
    static get CARD_NAME() {
        return 'botSetupCard';
    }

    static get LANGUAGE_INPUT_ID() {
        return 'DEFAULT_LANGUAGE';
    }

    static get DEPLOYMENT_ID_INPUT_ID() {
        return 'DEPLOYMENT_ID';
    }

    static get MY_CHAT_ID_INPUT_ID() {
        return 'MY_CHAT_ID';
    }

    constructor(model) {
        this._model = model;
    }

    static create(model) {
        if (!(model instanceof SetupFlow)) {
            throw new Error('model instance must be an instance of SetupFlow');
        }
        return new BotSetupCard(model);
    }

    build() {
        const cardBuilder = CardService.newCardBuilder()
            .setName(BotSetupCard.CARD_NAME)
            .setHeader(CardService.newCardHeader()
                .setTitle('Bot Settings')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl('https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png')
                .setSubtitle('Configure your bot settings'))
            .addSection(CardService.newCardSection()
                .addWidget(BotSetupCard.Widgets.BOT_TOKEN(this._model.state))
                .addWidget(BotSetupCard.Widgets.DEPLOYMENT_ID(this._model.state))
                .addWidget(BotSetupCard.Widgets.CHAT_ID(this._model.state))
                .addWidget(BotSetupCard.Widgets.DEFAULT_LANGUAGE(this._model.state))
                .addWidget(BotSetupCard.Widgets.WEBHOOK_STATUS(this._model.state)))
            .setFixedFooter(CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText(' 💾 Save')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('UiEventHandlers.Bot.onSaveBotSetupSettingsClick')
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

BotSetupCard.Widgets = {
    BOT_TOKEN: (state = null) =>
        CardService.newDecoratedText()
            .setBottomLabel(`${state.botTokenSet ? '🟢 Set' : '🔴 Not Set'}`)
            .setText(`${state.botToken || '[Not Set]'}`)
            .setTopLabel('Bot Information')
            //.setBottomLabel(`Bot status: ${state.botTokenSet || 'Not Configured'}`)
            .setButton(BotSetupCard.Buttons.REGISTER_NEW_BOT(state)),
    WEBHOOK_STATUS: (state = null) =>
        CardService.newDecoratedText()
            .setWrapText(true)
            .setBottomLabel(`${state.webhookSet ? '🟢 Set' : '🔴 Not Set'}`)
            .setText('Webhook Status')
            .setButton(state.webhookSet ? BotSetupCard.Buttons.UNSET_WEBHOOK(state) : BotSetupCard.Buttons.ACTIVATE_WEBHOOK(state))
            .setTopLabel(`${state.webhookUrl || '[Not Set]'}`),
    CHAT_ID: (state = null) =>
        CardService.newTextInput()
            .setFieldName(BotSetupCard.MY_CHAT_ID_INPUT_ID)
            .setTitle('Chat ID')
            .setHint('Enter your chat ID here')
            .setValue(state.chatId || ''),
    DEPLOYMENT_ID: (state = null) =>
        CardService.newTextInput()
            .setFieldName(BotSetupCard.DEPLOYMENT_ID_INPUT_ID)
            .setTitle('Deployment ID')
            .setHint('Enter your deployment ID here')
            .setValue(state.deploymentId || ''),
    DEFAULT_LANGUAGE: (state = null) =>
        CardService.newTextInput()
            .setFieldName(BotSetupCard.LANGUAGE_INPUT_ID)
            .setTitle('Default Language')
            .setHint('Enter your default language here (e.g., en, es, fr)')
            .setValue(state.defaultLanguage || '')
};

BotSetupCard.Buttons = {
    SET_MY_CHAT_ID: (state = null) => CardService.newTextButton()
        .setText('Chat ID')
        .setDisabled(!state.botTokenSet)
        .setTextButtonStyle(
            state.chatIdSet ?
                CardService.TextButtonStyle.TEXT :
                CardService.TextButtonStyle.FILLED
        )
        .setOnClickAction(CardService.newAction()
            .setFunctionName('UiEventHandlers.Home.openSetMyChatIdCard')),
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
    SET_DEPLOYMENT_ID: (state = null) => CardService.newTextButton()
        .setText('🚀 Deployment Settings')
        .setDisabled(!state.botTokenSet)
        .setOnClickAction(CardService.newAction()
            .setFunctionName('UiEventHandlers.Home.openDeploymentSettingsCard'))
};

// --- IGNORE (for Node.js support) --- //
if (typeof module !== "undefined" && module.exports) {
    module.exports = BotSetupCard;
}