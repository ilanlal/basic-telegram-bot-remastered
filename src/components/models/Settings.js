const { Attribute } = require("./Attribute");

class Settings {
    constructor() {
        this._entitySchema = Settings.Entity;
        this._data = [...this._entitySchema.attributes.map(attr => attr.toObject())];
    }

    get entitySchema() {
        return this._entitySchema;
    }

    get attributes() {
        return this._entitySchema.attributes;
    }

    get data() {
        return this._data;
    }

    load() {
        const userProperties = PropertiesService.getUserProperties();
        this._entitySchema.attributes.forEach(attr => {
            const storedValue = userProperties.getProperty(attr.id);
            if (storedValue !== null) {
                // Convert to appropriate type
                switch (attr.type) {
                    case 'boolean':
                        attr.value = (storedValue === 'true');
                        break;
                    case 'number':
                        attr.value = Number(storedValue);
                        break;
                    case 'string':
                    default:
                        attr.value = storedValue;
                }
            }
            this._data = [...this._data.filter(a => a.id !== attr.id), attr.toObject()];
        });
        return this;
    }

    save(attributesList = []) {
        const userProperties = PropertiesService.getUserProperties();
        attributesList.forEach(attr => {
            userProperties.setProperty(attr.id, String(attr.value));
        });
        return this;
    }

    static create() {
        return new Settings();
    }
}

Settings.Entity = {
    id: 'Settings',
    name: 'Settings',
    description: 'Bot configuration settings',
    attributes: [
        { id: 'logEvents', name: 'Log Events', description: 'Enable logging of events', value: false, type: 'boolean' },
        { id: 'autoReplyEnabled', name: 'Auto Reply Enabled', description: 'Enable automatic replies', value: false, type: 'boolean' },
        { id: 'autoReplyMessage', name: 'Auto Reply Message', description: 'Message to send when auto-reply is enabled', value: 'I am currently unavailable.', type: 'string' },
        { id: 'adminChatId', name: 'Admin Chat ID', description: 'Chat ID of the admin user', value: 0, type: 'number' }
    ].map(attr => Attribute.create(attr)) // Convert to Attribute instances
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Settings
    };
}