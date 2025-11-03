class BotModel {
    static create(token = '[YOUR_BOT_TOKEN]', options = {}) {
        return new BotModel(token, options);
    }

    constructor(token = '[YOUR_BOT_TOKEN]', options = {}) {
        this._token = token;
        this._options = options;
        this._defaultLanguage = 'default';
        this._telegramClient = TelegramBotClient.newClient(token);
    }

    setDefaultLanguage(language) {
        this._defaultLanguage = language;
        return this;
    }

    getMe() {
        return this._telegramClient.getMe();
    }

    getWebhookInfo() {
        return this._telegramClient.getWebhookInfo();
    }

    setWebhook(webhookUrl = '[YOUR_WEBHOOK_URL]') {
        return this._telegramClient.setWebhook(webhookUrl);
    }

    deleteWebhook(webhookUrl = '[YOUR_WEBHOOK_URL]') {
        return this._telegramClient.deleteWebhook(webhookUrl);
    }

    setMyCommands(commands = [], language, scope = 'default') {
        return this._telegramClient.setMyCommands({ commands, language, scope });
    }

    setMyName(name, language) {
        return this._telegramClient.setMyName(name, language);
    }

    setMyDescription(description, language) {
        return this._telegramClient.setMyDescription(description, language);
    }

    setMyShortDescription(shortDescription, language) {
        return this._telegramClient.setMyShortDescription(shortDescription, language);
    }

    get defaultLanguage() {
        return this._defaultLanguage;
    }

    get token() {
        return this._token;
    }

    get options() {
        return this._options;
    }

    get telegramClient() {
        return this._telegramClient;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotModel };
}