const { Model } = require('./Model');

describe('Model', () => {
    test('should initialize with empty data', () => {
        const model = new Model();
        expect(model.getData()).toEqual({});
    });

    test('should allow setting and getting data', () => {
        const model = new Model();
        model.setData({ key: 'value' });
        expect(model.getData()).toEqual({ key: 'value' });
    });
});