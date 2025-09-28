/* eslint-disable no-undef */

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

    getName() {
        return this._name;
    }

    setName(name = '') {
        this._name = name;
        return this;
    }
    
    constructor() {
        /** @type {Date || null} */
        this._lastSync = null;
        /** @type {string} */
        this._botToken = '[YOUR_BOT_TOKEN]';
        /** @type {Date | null} */
        this._createdOn = null;
        /** @type {TelegramUser | null} */
        this._user = null;
        this._name = '';
    }

    static create() {
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
            .setName(json._name)
            .setBotToken(json._botToken)
            .setCreatedOn(json._createdOn)
            .setLastSync(json._lastSync)
            .setUser((json._user && JSON.parse(json._user)) || null);
    }

    toJsonString() {
        return JSON.stringify({
            _name: this.getName(),
            _botToken: this.getBotToken(),
            _createdOn: this.getCreatedOn()?.toISOString(),
            _lastSync: this.getLastSync()?.toISOString(),
            _user: this.getUser()?.toJsonString(),
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TelegramBotInfo
    };
}