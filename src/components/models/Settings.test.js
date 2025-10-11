require('../../../tests');
const { Settings } = require('./Settings');

describe('Settings', () => {
    it('should create settings with default parameters', () => {
        const settings = Settings.create();
        expect(settings.params).toEqual(Settings.Params);
    });
    
    it('should save and load settings correctly', () => {
        const customParams = {
            logEvents: true,
            autoReplyEnabled: true,
            autoReplyMessage: "I'm here!",
            adminChatId: 1234567890
        };
        const settings = Settings.create();
        settings.save(customParams);
        const loadedSettings = Settings.create();
        expect(loadedSettings.params).toEqual(customParams);
    });
});