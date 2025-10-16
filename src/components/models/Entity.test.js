require('.../../tests');
const { Entity } = require('./Entity');
const { Widget } = require('./Widget');

describe('Entity', () => {
    // throw error if entityName is missing
    it('should throw an error if entityName is missing', () => {
        expect(() => Entity.create())
            .toThrow(Entity.INVALID_ENTITY_ERROR);
        expect(() => Entity.createFromObject({ id: 'entity1' }))
            .toThrow(Entity.INVALID_ENTITY_ERROR);
    });

    it('should create an entity with custom values', () => {
        const entity = Entity.create('User');
        expect(entity.displayName).toBe('User');
        expect(entity.entityName).toBe('User');
        expect(entity.sections).toEqual([]);
    });

    it('should add widgets to the entity', () => {
        const entity = Entity.create('User', 'user');
        const widget1 = Widget.create({ id: 'username', value: 'testuser', type: 'string' });
        const widget2 = Widget.create({ id: 'age', value: 30, type: 'number' });
        
        entity.addSection({
            header: 'User Info',
            collapseControl: 'COLLAPSE_CONTROL_NONE',
            collapsible: false,
            numUncollapsibleWidgets: 0,
            widgets: [widget1, widget2]
        });

        expect(entity.sections.length).toBe(1);
        expect(entity.sections[0].header).toBe('User Info');
        expect(entity.sections[0].widgets.length).toBe(2);
        expect(entity.sections[0].widgets[0].id).toBe('username');
        expect(entity.sections[0].widgets[0].value).toBe('testuser');
        expect(entity.sections[0].widgets[0].type).toBe('string');
        expect(entity.sections[0].widgets[1].id).toBe('age');
        expect(entity.sections[0].widgets[1].value).toBe(30);
        expect(entity.sections[0].widgets[1].type).toBe('number');
    });

    it('should create an entity from an object', () => {
        const obj = {
            entityName: 'user',
            displayName: 'User',
            sections: [{
                header: '',
                collapseControl: 'COLLAPSE_CONTROL_NONE',
                collapsible: false,
                numUncollapsibleWidgets: 0,
                widgets: [
                    { id: 'username', name: 'Username', type: 'string', value: 'testuser' },
                    { id: 'age', name: 'Age', type: 'number', value: 30 }
                ]
            }]
        };
        const entity = Entity.createFromObject(obj);
        expect(entity.displayName).toBe('User');
        expect(entity.entityName).toBe('user');
        expect(entity.sections.length).toBe(1);
        expect(entity.sections[0].header).toBe('');
        expect(entity.sections[0].collapseControl).toBe('COLLAPSE_CONTROL_NONE');
        expect(entity.sections[0].collapsible).toBe(false);
        expect(entity.sections[0].numUncollapsibleWidgets).toBe(0);
        expect(entity.sections[0].widgets.length).toBe(2);
        expect(entity.sections[0].widgets[0].id).toBe('username');
        expect(entity.sections[0].widgets[0].value).toBe('testuser');
        expect(entity.sections[0].widgets[0].type).toBe('string');
        expect(entity.sections[0].widgets[1].id).toBe('age');
        expect(entity.sections[0].widgets[1].value).toBe(30);
        expect(entity.sections[0].widgets[1].type).toBe('number');
    });

});