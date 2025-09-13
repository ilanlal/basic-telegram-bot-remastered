const {TelegramBotClient, TelegramBotClientFactory} = require('./libs/TelegramBotClient');

global.TelegramBotClient = TelegramBotClient;
global.TelegramBotClientFactory = TelegramBotClientFactory.newTelegramBotClientFactory();
