require('@ilanlal/gasmocks');
require('../../services');
const { SetupFlow } = require('./SetupFlow');

describe('SetupFlow', () => {
    let model;

    beforeEach(() => {
        model = SetupFlow.create(
            new UserStore()
        );
    });

    test('should create a SetupFlow instance', () => {
        expect(model).toBeInstanceOf(SetupFlow);
    });
});