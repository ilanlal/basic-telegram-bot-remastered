const { BotSetupController } = require('./BotSetupController');
const { NavigationController } = require('./NavigationController');
const { BotController } = require('./BotController');
const { AccountController, AccountControllerFactory } = require('./AccountController');
const { SettingsController } = require('./SettingsController');
const { EntityController } = require('./EntityController');

global.EntityController = EntityController;
global.BotSetupController = BotSetupController;
global.AccountControllerFactory = AccountControllerFactory;
global.AccountController = AccountController;
global.BotController = BotController;
global.NavigationController = NavigationController;
global.SettingsController = SettingsController;