require('@ilanlal/gasmocks');
require("../models");

const UsersManagementCard = require('./UsersManagementCard');

describe('UsersManagementCard', () => {
    it('should create an instance of UsersManagementCard', () => {
        const card = UsersManagementCard.create();
        expect(card).toBeInstanceOf(UsersManagementCard);
    });
 
    it('should build a card with expected sections and widgets', () => {
        const card = UsersManagementCard.create();
        const builtCard = card.build();
        expect(builtCard).toBeDefined();
        const cardData = builtCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(UsersManagementCard.CARD_NAME);
        expect(cardData.sections).toBeDefined();
        expect(cardData.sections.length).toBeGreaterThan(0);
    });
});