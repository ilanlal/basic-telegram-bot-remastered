const { BotController, BotControllerFactory } = require('./BotController');
const { AboutController, AboutControllerFactory } = require('./AboutController');
const { AccountController, AccountControllerFactory } = require('./AccountController');
const { RootController } = require('./RootController');

global.RootController = RootController;
global.BotController = BotController;
global.BotControllerFactory = BotControllerFactory;
global.AboutController = AboutController;
global.AboutControllerFactory = AboutControllerFactory;
global.AccountController = AccountController;
global.AccountControllerFactory = AccountControllerFactory;