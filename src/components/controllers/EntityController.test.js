require('../../../tests');
const { EntityController } = require('./EntityController');

describe('Entity Controller', () => {
    test('should create an instance using the static create method', () => {
        const entityController = EntityController.create();
        expect(entityController).toBeInstanceOf(EntityController);
    });
});