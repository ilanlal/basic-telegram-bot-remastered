
class TelegramBot {
    constructor() {
        this._resources = [];
    }

    setDefaultLanguageCode(language_code = 'en') {
        this._default_language_code = language_code;
        return this;
    }

    addResource(resource = {}) {
        this._resources.push(new TelegramBot.Resource()
            .setLanguageCode(resource.language_code)
            .setDescription(resource.description)
            .setShortDescription(resource.short_description)
            .setName(resource.name)
            .setScope(resource.scope));
        return this;
    }
};

TelegramBot.Resource = class {
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
                .setCommand(command)
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