const { TelegramBotClient, TelegramBotClientFactory } = require('./lib/TelegramBotClient');

global.TelegramBotClient = TelegramBotClient;
global.TelegramBotClientFactory = TelegramBotClientFactory.newTelegramBotClientFactory();