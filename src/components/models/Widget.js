class Widget {
    static get INVALID_ID_ERROR() {
        return 'Widget id is required';
    }

    static tabIndex = 0;

    static create(widgetMeta = {}) {
        const { id, value = null, tabIndex = Widget.tabIndex++ } = widgetMeta;

        if (!id) {
            throw new Error(Widget.INVALID_ID_ERROR);
        }

        const widgetInstance = new Widget(id)
            .setTabIndex(tabIndex);

        if (value) {
            widgetInstance.setValue(value);
        }

        return widgetInstance;
    }

    constructor(id) {
        this._id = id;
        this._value = null;
        this._tabIndex = 0;
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
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Widget
    };
}