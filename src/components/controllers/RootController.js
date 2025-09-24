class RootController {
    setUserStore(userStore) {
        this._userStore = userStore;
        return this;
    }

    constructor(userStore = null) {
        this._userStore = userStore || new UserStore();
        this._botTokenSet = () => !!this._userStore.getTelegramBotInfo();
        this._deploymentId = () => this._userStore.getDeploymentId();
        this._telegramBotClient = () => {
            const botInfo = this._userStore.getTelegramBotInfo();
            const token = botInfo ? botInfo.getBotToken() : null;
            if (!token) {
                return null;
            }
            return new TelegramBotClient(token);
        };
        this._webhookUrl = () => {
            return this._telegramBotClient()
                ?.getWebhookInfo()
                ?.getContentText();
        };
        this._webhookSet = () => {
            if (!this._botTokenSet() || !this._telegramBotClient()) {
                return false;
            }
            const response = this._telegramBotClient().getWebhookInfo();
            if (response.getResponseCode() !== 200) {
                return false;
            }
            const contentText = response.getContentText();
            const res = JSON.parse(contentText);
            return res.result.url !== '';
        };
    }

    static create(userStore = null) {
        return new RootController(userStore);
    }

    navigateToHome() {
        const state = {
            webhookSet: this._webhookSet(),
            webhookUrl: this._webhookUrl() || "[Not Set]",
            botTokenSet: this._botTokenSet(),
            deploymentId: this._deploymentId() || ""
        };

        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        new HomeCard()
                            .setState(state)
                            .build()
                    )
            );
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RootController
    };
}