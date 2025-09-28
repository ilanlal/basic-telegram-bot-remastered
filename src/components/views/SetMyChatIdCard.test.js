require("@ilanlal/gasmocks");
const { SetMyChatIdCard } = require('./SetMyChatIdCard');

describe('SetMyChatIdCard', () => {
    test('build should return a CardService.ActionResponse', () => {
        const card = SetMyChatIdCard.create();
        const actionResponse = card.build();
        expect(actionResponse).toBeDefined();
    });
});
