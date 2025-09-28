require('../../services');
const { AutomationReply } = require('./AutomationReply');

describe('AutomationReply', () => {
    it('should create an instance', () => {
        const reply = AutomationReply.create();
        expect(reply).toBeInstanceOf(AutomationReply);
    });
});


