require('../../../tests');
const { BotModel } = require('./BotModel');

describe('Bot Model', () => {
    const sampleToken = 'sample-token-123';

    test('should create an instance using the constructor', () => {
        const bot = BotModel.create(sampleToken, {});
        expect(bot).toBeInstanceOf(BotModel);
    });

    test('should return the correct token', () => {
        const bot = BotModel.create(sampleToken, {});
        expect(bot.token).toBe(sampleToken);
    });

    test('should create an instance using the static create method', () => {
        const bot = BotModel.create(sampleToken, {});
        expect(bot).toBeInstanceOf(BotModel);
    });

    test('should have default language set correctly', () => {
        const bot = BotModel.create(sampleToken, {})
            .setDefaultLanguage('fr');

        expect(bot.defaultLanguage).toBe('fr');
    });

    test('should have options set correctly', () => {
        const options = { webhookUrl: 'https://example.com/webhook' };
        const bot = BotModel.create(sampleToken, options);
        expect(bot.options).toEqual(options);
    });

    // getMe
    test('should call getMe on telegram client', () => {
        const contentText = `{
            "result": {
                "id": 123456789,
                "is_bot": true,
                "first_name": "Test",
                "last_name": "User",
                "username": "testuser",
                "language_code": "en"
            }
        }`;

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${sampleToken}/getMe`)
            .return(new HttpResponse().setContentText(contentText));

        const bot = BotModel.create(sampleToken);
        const response = bot.getMe();

        expect(response.getResponseCode()).toBe(200);
        expect(response.getContentText()).toBe(contentText);
    });

    // getWebhookInfo
    test('should call getWebhookInfo on telegram client', () => {
        const contentText = `{
            "result": {
                "url": "https://example.com/webhook",
                "has_custom_certificate": false,
                "pending_update_count": 0,
                "ip_address": null
            }
        }`;

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${sampleToken}/getWebhookInfo`)
            .return(new HttpResponse().setContentText(contentText));

        const bot = BotModel.create(sampleToken);
        const response = bot.getWebhookInfo();
        expect(response.getResponseCode()).toBe(200);
        expect(response.getContentText()).toBe(contentText);
    });

    // setMyCommands
    test('should call setMyCommands on telegram client', () => {
        const language = 'en';
        const scope = 'default';
        const contentText = `{
            "result": true
        }`;
        const commands = [
            {
                command: "start",
                scope: "Start the bot"
            },
            {
                command: "help",
                scope: "Get help"
            }
        ];

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${sampleToken}/setMyCommands`)
            .return(new HttpResponse().setContentText(contentText));

        const bot = BotModel.create(sampleToken);
        const response = bot.setMyCommands(commands, language, scope);

        expect(response.getResponseCode()).toBe(200);
        expect(response.getContentText()).toBe(contentText);
    });

    // setWebhook
    test('should call setWebhook on telegram client', () => {
        const contentText = `{
            "result": true
        }`;
        const deploymentId = 'AKfycbx...';
        const webAppUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;
        const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setWebhook?url=${webAppUrl}`;
        UrlFetchAppStubConfiguration.when(callbackUrl)
            .return(new HttpResponse().setContentText(contentText));


        const bot = BotModel.create(sampleToken);
        const response = bot.setWebhook(webAppUrl);
        expect(response.getResponseCode()).toBe(200);
        expect(response.getContentText()).toBe(contentText);
    });

    // deleteWebhook
    test('should call deleteWebhook on telegram client', () => {
        const contentText = `{
            "result": true
        }`;
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbx.../exec';
        const callbackUrl = `https://api.telegram.org/bot${sampleToken}/deleteWebhook?url=${webAppUrl}`;
        UrlFetchAppStubConfiguration.when(callbackUrl)
            .return(new HttpResponse().setContentText(contentText));
        const bot = BotModel.create(sampleToken);
        const response = bot.deleteWebhook(webAppUrl);
        expect(response.getResponseCode()).toBe(200);
        expect(response.getContentText()).toBe(contentText);
    });

    // setMyName
    test('should call setMyName on telegram client', () => {
        const contentText = `{
            "result": true
        }`;
        const name = 'Test Bot Name';
        const language = 'en';
        const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setMyName`;
        UrlFetchAppStubConfiguration.when(callbackUrl)
            .return(new HttpResponse().setContentText(contentText));
        const bot = BotModel.create(sampleToken);
        const response = bot.setMyName(name, language);
        expect(response.getResponseCode()).toBe(200);
        expect(response.getContentText()).toBe(contentText);
    });

    // setMyDescription
    test('should call setMyDescription on telegram client', () => {
        const contentText = `{
            "result": true
        }`;
        const description = 'Test Bot Description';
        const language = 'en';
        const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setMyDescription`;
        UrlFetchAppStubConfiguration.when(callbackUrl)
            .return(new HttpResponse().setContentText(contentText));
        const bot = BotModel.create(sampleToken);
        const response = bot.setMyDescription(description, language);
        expect(response.getResponseCode()).toBe(200);
        expect(response.getContentText()).toBe(contentText);
    });

    // setMyShortDescription
    test('should call setMyShortDescription on telegram client', () => {
        const contentText = `{
            "result": true
        }`;
        const shortDescription = 'Test Short Description';
        const language = 'en';
        const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setMyShortDescription`;
        UrlFetchAppStubConfiguration.when(callbackUrl)
            .return(new HttpResponse().setContentText(contentText));
        const bot = BotModel.create(sampleToken);
        const response = bot.setMyShortDescription(shortDescription, language);
        expect(response.getResponseCode()).toBe(200);
        expect(response.getContentText()).toBe(contentText);
    });

    afterEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });
});