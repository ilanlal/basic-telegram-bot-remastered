class SettingsController {
    static create() {
        return new SettingsController();
    }

    constructor() {
    }

    setLogEvents(enabled = true) {
        const logAttrId = 'logEvents';
        // Load model with default settings
        const settings = Settings.create();
        // Find the logEvents attribute and update its value
        const logAttr = settings.attributes.find(attr => attr.id === logAttrId);
        logAttr.value = enabled;
        // Save the updated attribute
        return settings.save([logAttr]).load();
    }

    setAutoReply(enabled = true, message = "I'm here!") {
        const settings = Settings.create();
        const replyAttr = settings.attributes.find(
            attr => attr.id === 'autoReplyEnabled');
        const messageAttr = settings.attributes.find(
            attr => attr.id === 'autoReplyMessage');
        replyAttr.value = enabled;
        messageAttr.value = message;
        return settings.save([replyAttr, messageAttr]);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SettingsController };
}