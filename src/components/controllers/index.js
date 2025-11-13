const { BotSetupController } = require('./BotSetupController');
const { NavigationController } = require('./NavigationController');
const { AccountController, AccountControllerFactory } = require('./AccountController');
const { EntityController } = require('./EntityController');

global.EntityController = EntityController;
global.BotSetupController = BotSetupController;
global.AccountControllerFactory = AccountControllerFactory;
global.AccountController = AccountController;
global.NavigationController = NavigationController;