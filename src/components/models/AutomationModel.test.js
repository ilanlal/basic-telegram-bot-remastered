require('../../../tests');
const { AutomationModel } = require('./AutomationModel');

describe('AutomationModel', () => {
    it('should create an instance', () => {
        const model = AutomationModel.create();
        expect(model).toBeInstanceOf(AutomationModel);
    });
});


