require('../../../tests');

const { ChannelsHandler } = require('./ChannelsHandler');

describe('Channels Handler', () => {
    test('should create an instance of ChannelsHandler', () => {
        const handler = new ChannelsHandler();
        expect(handler).toBeInstanceOf(ChannelsHandler);
    });
});
