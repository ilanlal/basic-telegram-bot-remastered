const TelegramBot = require('./TelegramBot');

describe('TelegramBot', () => {
    let bot;

    beforeEach(() => {
        bot = new TelegramBot();
    });

    test('setDefaultLanguageCode should set the default language code', () => {
        bot.setDefaultLanguageCode('es');
        expect(bot.getDefaultLanguageCode()).toBe('es');
    });

    test('addInfo should add a resource', () => {
        const resource = {
            language_code: 'en',
            description: 'Test description',
            short_description: 'Test short description',
            name: 'Test name',
            scope: 'Test scope',
            commands: []
        };

        bot.addInfo(resource);
        expect(bot.getInfoList().length).toBe(1);
        expect(bot.getInfoList()[0]).toEqual(resource);
    });
});

// TelegramBot.Resource
describe('TelegramBot.Resource', () => {
    let resource;

    beforeEach(() => {
        resource = new TelegramBot.Info()
            .setLanguageCode('en')
            .setDescription('Test description')
            .setShortDescription('Test short description')
            .setName('Test name')
            .setScope('Test scope');
    });

    test('setLanguageCode should set the language code', () => {
        expect(resource.language_code).toBe('en');
    });

    test('setDescription should set the description', () => {
        expect(resource.description).toBe('Test description');
    });

    test('setShortDescription should set the short description', () => {
        expect(resource.short_description).toBe('Test short description');
    });

    test('setName should set the name', () => {
        expect(resource.name).toBe('Test name');
    });

    test('setScope should set the scope', () => {
        expect(resource.scope).toBe('Test scope');
    });

    test('addCommand should add a command', () => {
        const command1 = {
            command: '/test',
            description: 'Test command'
        };
        const command2 = {
            command: '/another',
            description: 'Another command'
        };
        resource.addCommand(command1);
        expect(resource.commands.length).toBe(1);
        expect(resource.commands[0]).toEqual(command1);

        // add another command
        resource.addCommand(command2);
        expect(resource.commands.length).toBe(2);
        expect(resource.commands[1]).toEqual(command2);
    });
});

// TelegramBot.Command
describe('TelegramBot.Command', () => {
    let command;

    beforeEach(() => {
        command = new TelegramBot.Command()
            .setCommand('/start')
            .setDescription('Start the bot');
    });

    test('setCommand should set the command', () => {
        expect(command.command).toBe('/start');
    });

    test('setDescription should set the description', () => {
        expect(command.description).toBe('Start the bot');
    });
});
