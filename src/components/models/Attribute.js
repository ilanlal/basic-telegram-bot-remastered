class Attribute {
    constructor() {
    }

    static create({ id, ...rest } = {}) {
        if (!id) {
            throw new Error('Attribute id is required');
        }
        const attribute = new Attribute();
        attribute.id = id;
        Object.assign(attribute, rest);
        return attribute;
    }

    get id() {
        return this._id;
    }

    set id(val) {
        this._id = val;
    }

    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
    }

    get description() {
        return this._description;
    }
    set description(val) {
        this._description = val;
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
    }

    get type() {
        return this._type;
    }
    set type(val) {
        this._type = val;
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