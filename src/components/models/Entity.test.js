require('../../../tests');
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
        const widget1 = Widget.create(
            {
                id: 'username',
                TextInput: { title: 'Username', hint: 'Enter your username', value: 'testuser' }, type: 'string', value: 'testuser'
            }
        );
        const widget2 = Widget.create(
            {
                id: 'age',
                TextInput: { title: 'Age', hint: 'Enter your age', value: 30 }, type: 'number', value: 30
            }
        );

        entity.addSection({
            header: 'User Info',
            collapsible: false,
            numUncollapsibleWidgets: 0,
            widgets: [widget1, widget2]
        });

        expect(entity.sections.length).toBe(1);
        expect(entity.sections[0].header).toBe('User Info');
        expect(entity.sections[0].widgets.length).toBe(2);
        expect(entity.sections[0].widgets[0].id).toBe('username');
        expect(entity.sections[0].widgets[0].value).toBe('testuser');
        expect(entity.sections[0].widgets[1].id).toBe('age');
        expect(entity.sections[0].widgets[1].value).toBe(30);
    });

    it('should create an entity from an object', () => {
        const obj = {
            entityName: 'user',
            displayName: 'User',
            header: {
                title: '',
                subTitle: ''
            },
            sections: [{
                header: '',
                collapseControl: 'COLLAPSE_CONTROL_NONE',
                collapsible: false,
                numUncollapsibleWidgets: 0,
                widgets: [
                    {
                        id: 'username',
                        TextInput: {
                            title: 'Username',
                            hint: 'Enter your username',
                            value: 'testuser'
                        },
                        type: 'string',
                        value: 'testuser'
                    },
                    {
                        id: 'age',
                        TextInput: {
                            title: 'Age',
                            hint: 'Enter your age',
                            value: 30
                        },
                        type: 'number',
                        value: 30
                    }
                ]
            }],
            footer: { text: '' }
        };
        const entity = Entity.createFromObject(obj);
        expect(entity.displayName).toBe('User');
        expect(entity.entityName).toBe('user');
        expect(entity.sections.length).toBe(1);
        expect(entity.sections[0].header).toBe('');
        expect(entity.sections[0].collapsible).toBe(false);
        expect(entity.sections[0].numUncollapsibleWidgets).toBe(0);
        expect(entity.sections[0].widgets.length).toBe(2);
        expect(entity.sections[0].widgets[0].id).toBe('username');
        expect(entity.sections[0].widgets[0].value).toBe('testuser');
        expect(entity.sections[0].widgets[1].id).toBe('age');
        expect(entity.sections[0].widgets[1].value).toBe(30);
    });

    // should have default image URL if not provided
    it('should have default image URL if not provided', () => {
        const entity = Entity.create('Product');
        expect(entity.imageUrl).toBe(Entity.DEFAULT_IMAGE_URL);
    });
});