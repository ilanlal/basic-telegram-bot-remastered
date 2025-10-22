class Attribute {
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
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

    constructor(id, name, description, type, defaultValue = undefined) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._value = defaultValue;
        this._type = type;
    }

    setValue(value) {
        this._value = value;
        return this;
    }

    getValue() {
        return this._value;
    }

    static create({ id, name, description, type, value, ...rest } = {}) {
        if (!id) {
            throw new Error('Attribute id is required');
        }
        const attribute = new Attribute(
            id,
            name,
            description,
            type,
            value
        );
        return attribute;
    }

    toObject() {
        return {
            id: this._id,
            name: this._name,
            description: this._description,
            value: this._value,
            type: this._type
        };
    
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Attribute
    };
}