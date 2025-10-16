class Entity {
    static get INVALID_ENTITY_ERROR() {
        return 'Invalid entity: missing entityName';
    }

    static get DEFAULT_IMAGE_URL() {
        return 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/refs/heads/vnext/assets/logo128.png';
    }

    static get DEFAULT_DISPLAY_TYPE() {
        return 'add'; // or 'list' or 'edit'
    }

    constructor(entityName) {
        this._entityName = entityName;
        this._displayName = entityName;
        this._description = '';
        this._imageUrl = Entity.DEFAULT_IMAGE_URL;
        this._displayType = Entity.DEFAULT_DISPLAY_TYPE; // or 'list' or 'edit'
        this._sections = [];
    }

    static create(entityName) {
        if (!entityName || typeof entityName !== 'string' || entityName.trim() === '') {
            throw new Error(Entity.INVALID_ENTITY_ERROR);
        }
        return new Entity(entityName);
    }

    static createFromObject(obj = {}) {
        const entity = Entity.create(obj.entityName);
        entity.setDisplayName(obj.displayName || obj.entityName);
        entity.setDescription(obj.description || '');
        entity.setImageUrl(obj.imageUrl || Entity.DEFAULT_IMAGE_URL);
        entity.setDisplayType(obj.displayType || Entity.DEFAULT_DISPLAY_TYPE);
        if (obj.sections && Array.isArray(obj.sections)) {
            obj.sections.forEach(section => {
                entity.addSection(section);
            });
        }

        return entity;
    }

    /// Getters
    get displayType() {
        return this._displayType;
    }

    get entityName() {
        return this._entityName;
    }

    get displayName() {
        return this._displayName;
    }

    get description() {
        return this._description;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    get sections() {
        return this._sections;
    }

    /// Setters
    addSection(section) {
        let newSection = section;
        if (!newSection) {
            throw new Error('Invalid section: cannot be null or undefined');
        }
        if (!(newSection instanceof Section)) {
            newSection = Section.createFromObject(newSection);
        }
        this._sections.push(newSection);
        return this;
    }

    setEntityName(entityName) {
        this._entityName = entityName;
        return this;
    }

    setDisplayName(displayName) {
        this._displayName = displayName;
        return this;
    }

    setDescription(description) {
        this._description = description;
        return this;
    }

    setImageUrl(imageUrl) {
        this._imageUrl = imageUrl;
        return this;
    }

    setDisplayType(displayType) {
        this._displayType = displayType;
        return this;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Entity };
}