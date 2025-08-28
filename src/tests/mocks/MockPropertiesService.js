class MockPropertiesService {
    constructor() {
        this.properties = {};
    }

    getUserProperties() {
        return {
            getProperty: (key) => this.properties[key] || null,
            setProperty: (key, value) => {
                this.properties[key] = value;
            },
            deleteProperty: (key) => {
                delete this.properties[key];
            }
        };
    }
}

class MockPropertiesServiceFactory {
    constructor() {
        this._mockPropertiesService = new MockPropertiesService();
    }

    static getUserProperties() {
        return new MockPropertiesServiceFactory()
            ._mockPropertiesService.getUserProperties();
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MockPropertiesService: MockPropertiesServiceFactory
    };
}
