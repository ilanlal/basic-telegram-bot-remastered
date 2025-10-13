require('.../../tests');
const { Entity } = require('./Entity');
const { Attribute } = require('./Attribute');

describe('Entity', () => {
    // throw error if name is missing
    it('should throw an error if name is missing', () => {
        expect(() => Entity.create('entity1')).toThrow('Invalid entity: missing name');
        expect(() => Entity.createFromObject({ id: 'entity1' })).toThrow('Invalid object: missing name');
    });

    it('should create an entity with custom values', () => {
        const entity = Entity.create('user', 'User');
        expect(entity.name).toBe('User');
        expect(entity.id).toBe('user');
        expect(entity.attributes).toEqual([]);
    });

    it('should add attributes to the entity', () => {
        const entity = Entity.create('User', 'user');
        const attr1 = Attribute.create({ id: 'username', value: 'testuser', type: 'string' });
        const attr2 = Attribute.create({ id: 'age', value: 30, type: 'number' });
        entity.addAttribute(attr1).addAttribute(attr2);
        expect(entity.attributes.length).toBe(2);
        expect(entity.attributes[0]).toBe(attr1);
        expect(entity.attributes[1]).toBe(attr2);
    });
});