class Attribute {
    
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

    static create({ id, ...rest } = {}) {
        if (!id) {
            throw new Error('Attribute id is required');
        }
        const attribute = new Attribute();
        attribute.id = id;
        Object.assign(attribute, rest);
        return attribute;
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            value: this.value,
            type: this.type
        };
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Attribute
    };
}