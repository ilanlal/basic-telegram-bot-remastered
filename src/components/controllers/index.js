const { BotSetupController } = require('./BotSetupController');
const { EntityController } = require('./EntityController');
const { CustomerController } = require('./CustomerController');

global.EntityController = EntityController;
global.BotSetupController = BotSetupController;
global.CustomerController = CustomerController;