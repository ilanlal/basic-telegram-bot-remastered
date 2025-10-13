class Entity {
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get attributes() {
        return this._attributes;
    }

    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._attributes = [];
    }

    addAttribute(attr) {
        this._attributes.push(attr);
        return this;
    }

    static create(id, name) {
        if (!name) {
            throw new Error('Invalid entity: missing name');
        }
        return new Entity(id, name);
    }

    static createFromObject(obj) {
        if (!obj.name) {
            throw new Error('Invalid object: missing name');
        }
        const entity = Entity.create(obj.id, obj.name);
        if (!Array.isArray(obj.attributes)) {
            return entity;
        }
        obj.attributes.forEach(attr => {
            entity.addAttribute(Attribute.create(attr));
        });
        return entity;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Entity };
}