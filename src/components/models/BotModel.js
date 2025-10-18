class BotModel {
    static create(token = '[YOUR_BOT_TOKEN]', defaultLanguage = 'en', options = {}) {
        return new BotModel(token, defaultLanguage, options);
    }

    constructor(token = '[YOUR_BOT_TOKEN]', defaultLanguage = 'en', options = {}) {
        this._token = token;
        this._defaultLanguage = defaultLanguage;
        this._options = options;
        this._telegramClient = TelegramBotClient.newClient(token);
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