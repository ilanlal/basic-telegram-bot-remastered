class Settings {
    constructor() {
        this._params = { ...Settings.Params };
        this.load();
    }

    get params() {
        return this._params;
    }

    load() {
        const userProperties = PropertiesService.getUserProperties();
        const logEvents = userProperties.getProperty(Settings.Keys.logEvents);
        if (logEvents !== null) {
            this._params.logEvents = (logEvents === 'true');
        }
        const autoReplyEnabled = userProperties.getProperty(Settings.Keys.autoReplyEnabled);
        if (autoReplyEnabled !== null) {
            this._params.autoReplyEnabled = (autoReplyEnabled === 'true');
        }
        const autoReplyMessage = userProperties.getProperty(Settings.Keys.autoReplyMessage);
        if (autoReplyMessage !== null) {
            this._params.autoReplyMessage = autoReplyMessage;
        }
        const adminChatId = userProperties.getProperty(Settings.Keys.adminChatId);
        if (adminChatId !== null) {
            this._params.adminChatId = parseInt(adminChatId, 10);
        }
        return this;
    }

    save(params = Settings.Params) {
        const userProperties = PropertiesService.getUserProperties();
        Object.keys(params).forEach(key => {
            if (key in Settings.Keys) {
                userProperties.setProperty(Settings.Keys[key], params[key].toString());
                this._params[key] = params[key];
            }
        });
        return this;
    }

    static create() {
        return new Settings();
    }
}

Settings.Params = {
    logEvents: false,
    autoReplyEnabled: false,
    autoReplyMessage: "Hello! I'm currently unavailable. I'll get back to you as soon as I can.",
    adminChatId: 0
};

Settings.Keys = {
    logEvents: 'logEvents',
    autoReplyEnabled: 'autoReplyEnabled',
    autoReplyMessage: 'autoReplyMessage',
    adminChatId: 'adminChatId'
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Settings
  };
}