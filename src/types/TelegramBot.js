
class TelegramBot {
    constructor(default_language_code = 'en') {
        this._default_language_code = default_language_code;
        this._infoList = [];
    }

    getDefaultLanguageCode() {
        return this._default_language_code;
    }

    setDefaultLanguageCode(language_code) {
        if (!language_code || typeof language_code !== 'string' || language_code.length !== 2) {
            throw new Error('Language code is required. It must be a 2-letter ISO 639-1 code.');
        }
        this._default_language_code = language_code;
        return this;
    }

    addInfo(resource = {}) {
        this._infoList.push(new TelegramBot.Info()
            .setLanguageCode(resource.language_code)
            .setDescription(resource.description)
            .setShortDescription(resource.short_description)
            .setName(resource.name)
            .setScope(resource.scope));

            if (Array.isArray(resource.commands)) {
                resource.commands.forEach(command => {
                    this._infoList[this._infoList.length - 1].addCommand( command );
                });
            }

        return this;
    }

    getInfoList() {
        return this._infoList;
    }
};

TelegramBot.Info = class {
    constructor() {
        this.language_code = '';
        this.description = '';
        this.short_description = '';
        this.name = '';
        this.scope = null;
        this.commands = [];
    }

    setLanguageCode(code) {
        this.language_code = code;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setShortDescription(shortDescription) {
        this.short_description = shortDescription;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setScope(scope) {
        this.scope = scope;
        return this;
    }

    addCommand(command = {}) {
        this.commands.push(
            new TelegramBot.Command()
                .setCommand(command.command)
                .setDescription(command.description));
        return this;
    }
};

TelegramBot.Command = class {
    constructor() {
        this.command = '';
        this.description = '';
    }

    setCommand(command) {
        this.command = command;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TelegramBot;
}