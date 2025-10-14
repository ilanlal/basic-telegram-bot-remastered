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

    get description() {
        return this._description;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    constructor(id, name, description = '', imageUrl = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png') {
        this._id = id;
        this._name = name;
        this._description = description;
        this._imageUrl = imageUrl;
        this._attributes = [];
    }

    addAttribute(attr) {
        this._attributes.push(attr);
        return this;
    }

    static create(id, name, description = '', imageUrl = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png') {
        if (!name) {
            throw new Error('Invalid entity: missing name');
        }
        return new Entity(id, name, description, imageUrl);
    }

    static createFromObject(obj) {
        if (!obj.name) {
            throw new Error('Invalid object: missing name');
        }
        const entity = Entity.create(obj.id, obj.name, obj.description, obj.imageUrl);
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