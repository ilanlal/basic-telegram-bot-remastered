class Widget {
    static get INVALID_ID_ERROR() {
        return 'Widget id is required';
    }

    static tabIndex = 0;

    static create({ id, view, value, type } = {}) {
        if (!id) {
            throw new Error(Widget.INVALID_ID_ERROR);
        }

        const widget = new Widget(id)
            .setTabIndex(Widget.tabIndex++);

        if (view) {
            widget.setView(view);
        }

        if (value) {
            widget.setValue(value);
        }

        if (type) {
            widget.setType(type);
        }

        return widget;
    }

    constructor(id) {
        this._id = id;
        this._view = null;
        this._value = null;
        this._type = null;
        this._tabIndex = 0;
    }

    /// Setters
    setType(type) {
        this._type = type;
        return this;
    }

    setView(view) {
        this._view = view;
        return this;
    }

    setValue(value) {
        this._value = value;
        return this;
    }

    setTabIndex(tabIndex) {
        this._tabIndex = tabIndex;
        return this;
    }

    /// Getters
    get type() {
        return this._type;
    }

    get id() {
        return this._id;
    }

    get view() {
        return this._view;
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