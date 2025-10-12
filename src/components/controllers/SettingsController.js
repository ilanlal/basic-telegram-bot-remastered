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

    toggleBooleanSetting(settingId, currentValue) {
        const settings = Settings.create().load();
        const targetAttr = settings.attributes.find(attr => attr.id === settingId);
        if (targetAttr) {
            targetAttr.value = (currentValue === 'true');
            return settings.save([targetAttr]).load();
        }
        throw new Error(`Setting with ID ${settingId} not found`);
    }
    saveSettings(e) {
        const formInputs = e.formInput;
        const settings = Settings.create().load();
        const updatedAttrs = [];

        for (const [key, value] of Object.entries(formInputs)) {
            const attr = settings.attributes.find(attr => attr.id === key);
            if (attr) {
                attr.value = value;
                updatedAttrs.push(attr);
            }
        }

        return settings.save(updatedAttrs);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SettingsController };
}