const {doGet} = require('./Code');

describe('Code', () => {
    it('should run doGet message handler', () => {
        const event = {}; // Mock event object
        const response = doGet(event);
        expect(response).toBeDefined();
    });
});