require('../../../tests');
const SettingsCard  = require('./SettingsCard');

describe('SettingsCard', () => {
    it('should create a card with the correct name', () => {
        const card = SettingsCard.create();
        const builtCard = card.build();
        const data = builtCard.getData();
        expect(data.name).toBe(SettingsCard.CARD_NAME);
       
    });
});
