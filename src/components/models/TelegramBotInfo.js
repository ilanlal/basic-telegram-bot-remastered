// version: 1.0.0
class TelegramBotInfo {
    /** @returns {string | null} */
    getBotToken() {
        return this._botToken;
    }

    /** @param {string} botToken */
    setBotToken(botToken) {
        this._botToken = botToken;
        return this;
    }

    getCreatedOn() {
        return this._createdOn;
    }

    /** @param {Date} createdOn */
    setCreatedOn(createdOn) {
        this._createdOn = createdOn;
        return this;
    }

    getLastSync() {
        return this._lastSync;
    }

    /** @param {Date} lastSync */
    setLastSync(lastSync = null) {
        this._lastSync = lastSync;
        return this;
    }

    getUser() {
        return this._user;
    }

    setUser(user = null) {
        this._user = user;
        return this;
    }

    constructor() {
        /** @type {Date || null} */
        this._lastSync = null;
        /** @type {string | null} */
        this._botToken = null;
        /** @type {Date | null} */
        this._createdOn = null;
        /** @type {TelegramUser | null} */
        this._user = null;
    }

    static newTelegramBotInfo() {
        return new TelegramBotInfo();
    }

    static fromJsonString(json = '{}') {
        const data = JSON.parse(json, (key, value) => {
            if (key === '_createdOn' || key === '_lastSync') {
                return new Date(value); // Convert date strings back to Date objects
            }
            return value;
        });

        return new TelegramBotInfo()
            .fromJsonObject(data);
    }

    fromJsonObject(json = {}) {
        if (!json || typeof json !== 'object') {
            throw new Error("Invalid JSON object provided");
        }

        return new TelegramBotInfo()
            .setBotToken(json._botToken)
            .setCreatedOn(json._createdOn)
            .setLastSync(json._lastSync)
            .setUser(JSON.parse(json._user));
    }

    toJsonString() {
        return JSON.stringify({
            _botToken: this.getBotToken(),
            _createdOn: this.getCreatedOn()?.toISOString(),
            _lastSync: this.getLastSync()?.toISOString(),
            _user: this.getUser()?.toJsonString(),
        });
    }
}

class TelegramBotInfoBuilder {
    constructor() {
        this.telegramBotInfo = TelegramBotInfo.newTelegramBotInfo();
    }

    setBotToken(botToken) {
        this.telegramBotInfo.setBotToken(botToken);
        return this;
    }

    setCreatedOn(createdOn) {
        this.telegramBotInfo.setCreatedOn(createdOn);
        return this;
    }

    setLastSync(lastSync) {
        this.telegramBotInfo.setLastSync(lastSync);
        return this;
    }

    setUser(user) {
        this.telegramBotInfo.setUser(user);
        return this;
    }

    build() {
        return this.telegramBotInfo;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TelegramBotInfo,
        TelegramBotInfoBuilder
    };
}