class Widget {
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get render() {
        return this._render;
    }

    get description() {
        return this._description;
    }

    get type() {
        return this._type;
    }

    get value() {
        return this._value;
    }

    get disabled() {
        return this._disabled;
    }

    constructor(id, name, render, description, type, defaultValue = undefined) {
        this._id = id;
        this._name = name;
        this._render = render;
        this._description = description;
        this._value = defaultValue;
        this._type = type;
        this._disabled = false;
    }

    setId(id) {
        this._id = id;
        return this;
    }

    setName(name) {
        this._name = name;
        return this;
    }

    setDescription(description) {
        this._description = description;
        return this;
    }


    setDisabled(disabled) {
        this._disabled = disabled;
        return this;
    }

    setValue(value) {
        this._value = value;
        return this;
    }

    setRender(render) {
        this._render = render;
        return this;
    }

    static create({ id, name, render, description, type, value, ...rest } = {}) {
        if (!id) {
            throw new Error('Widget id is required');
        }
        const widget = new Widget(
            id,
            name,
            render,
            description,
            type,
            value
        );
        return widget;
    }

    toObject() {
        return {
            id: this._id,
            name: this._name,
            render: this._render,
            description: this._description,
            value: this._value,
            type: this._type
        };
    
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Widget
    };
}