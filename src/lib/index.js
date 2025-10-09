const { TelegramBotClient, TelegramBotClientFactory } = require('./TelegramBotClient');
const { Mocks } = require("./tests/TelegramBotClientStubConfiguration.test");

global.Mocks = Mocks;
global.TelegramBotClient = TelegramBotClient;
global.TelegramBotClientFactory = TelegramBotClientFactory.newTelegramBotClientFactory();