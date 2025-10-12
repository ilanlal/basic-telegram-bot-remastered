require('../../../tests');
const  { SettingsController } = require('./SettingsController');

describe('SettingsController', () => {
    let settingsController;
    beforeEach(() => {
        settingsController = SettingsController.create();
    });

    describe('setLogEvents', () => {
        it('should enable log events', () => {
            const response = settingsController.setLogEvents(true);
            // The save method in Settings returns the Settings instance, so we check that

            expect(response.toObject().data.find(attr => attr.id === 'logEvents').value).toBe(true);
        });

        it('should disable log events', () => {
            const response = settingsController.setLogEvents(false);
            expect(response.toObject().data.find(attr => attr.id === 'logEvents').value).toBe(false);
        });
    });
});