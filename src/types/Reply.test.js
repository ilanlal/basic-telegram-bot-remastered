const { Reply } = require('./Reply');

describe('Reply', () => {
    it('should create an instance with default values', () => {
        const reply = Reply.create();
        expect(reply.key).toBe('');
        expect(reply.reply).toBeNull();
    });
});
