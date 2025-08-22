// version: 1.0.0
class TelegramBotService {
    constructor(token = null, userStore = null) {
        if (!token) {
            throw new Error("Token is required to create TelegramBotService");
        }

        this._services = {
            /** @type {UserStore} */
            _userStore: userStore || ServiceBuilder.newUserStore(),
        };

        this._webClients = {
            _telegram: new TelegramBotClient(token)
        };
        this._models = {
            /** @type {string} */
            _token: token,
        };
    }

    static newTelegramBotService(token = null, userStore = null) {
        return new TelegramBotService(token, userStore);
    }

    getTelegramClient() {
        return this._webClients._telegram;
    }

    getToken() {
        return this._models._token;
    }

    validateBot() {
        const me = this._webClients._telegram.getMe();
        if (!me || !me.ok) {
            throw new Error(`Failed to validate bot with token: ${this._models._token}`);
        }
        const response = JSON.parse(me.getContentText());
        const user = TelegramUser.fromObject(response.result);

        this._services._userStore.setTelegramBotInfo(user);
    }
}
