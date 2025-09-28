const { NavigationController } = require('./NavigationController');
const { BotController } = require('./BotController');
const { AccountController, AccountControllerFactory } = require('./AccountController');

global.AccountControllerFactory = AccountControllerFactory;
global.AccountController = AccountController;
global.BotController = BotController;
global.NavigationController = NavigationController;