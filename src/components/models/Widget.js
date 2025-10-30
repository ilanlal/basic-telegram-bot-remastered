class Widget {
    static get INVALID_ID_ERROR() {
        return 'Widget id is required';
    }

    static tabIndex = 0;

    static create(widgetMeta = {}, userProperties = PropertiesService.getUserProperties()) {
        const { id, value = null, tabIndex = Widget.tabIndex++, propertyName = null } = widgetMeta;

        if (!id) {
            throw new Error(Widget.INVALID_ID_ERROR);
        }

        const widgetInstance = new Widget(id, userProperties)
            .setTabIndex(tabIndex);

        if (value) {
            widgetInstance.setValue(value);
        }

        if (propertyName) {
            widgetInstance.setPropertyName(propertyName);
        }

        return widgetInstance.bindValueFromUserProperty();
    }

    constructor(id, userProperty) {
        this._id = id;
        this._userProperty = userProperty;
        this._value = null;
        this._tabIndex = 0;
        this._propertyName = null;
    }

    bindValueFromUserProperty() {
        if (this._propertyName && this._userProperty) {
            const value = this._userProperty.getProperty(this._propertyName);
            if (value !== null) {
                this.setValue(value);
            }
        }
        return this;
    }

    /// Setters
    setValue(value) {
        this._value = value;
        return this;
    }

    setTabIndex(tabIndex) {
        this._tabIndex = tabIndex;
        return this;
    }

    setPropertyName(name) {
        this._propertyName = name;
        return this;
    }

    /// Getters
    get id() {
        return this._id;
    }

    get value() {
        return this._value;
    }

    get tabIndex() {
        return this._tabIndex;
    }

    get userProperty() {
        return this._propertyName;
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Widget
    };
}