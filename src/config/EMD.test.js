require('../../tests');
const { EMD } = require('./EMD');

describe('Config.EMD', () => {
    it('should have correct Bot entity configuration', () => {
        expect(EMD.Bot).toBeDefined();
        expect(EMD.Bot.entityName).toBe('Bot');
        expect(EMD.Bot.displayName).toBe('Bot');
        expect(EMD.Bot.pluralDisplayName).toBe('Bots');
        expect(EMD.Bot.sheetMeta).toBeDefined();
        expect(EMD.Bot.cardMeta).toBeDefined();
    });
});