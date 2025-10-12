require('../../../tests');
const { Attribute } = require('./Attribute');
const { Settings } = require('./Settings');

describe('Settings', () => {
    it('should create settings with default attributes', () => {
        const settings = Settings.create();
        expect(settings.attributes).toEqual(Settings.Entity.attributes);
    });

    it('should save and load settings correctly', () => {
        const customAttributes = [
            Attribute.create({ id: 'logEvents', value: true, type: 'boolean' }),
            Attribute.create({ id: 'autoReplyEnabled', value: true, type: 'boolean' }),
            Attribute.create({ id: 'autoReplyMessage', value: "I'm here!", type: 'string' }),
            Attribute.create({ id: 'adminChatId', value: 1110000000, type: 'number' })
        ];
        const settings = Settings.create();
        settings.save(customAttributes);
        const loadedSettings = Settings.create().load();
        
        expect(loadedSettings.data.length).toEqual(customAttributes.length);

        // Check each attribute
        customAttributes.forEach(attr => {
            const loadedAttr = loadedSettings.attributes.find(a => a.id === attr.id);
            expect(loadedAttr).toBeDefined();
            expect(loadedAttr.value).toEqual(attr.value);
            expect(loadedAttr.type).toEqual(attr.type);
        });
    });
});