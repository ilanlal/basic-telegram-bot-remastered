const { BotSetupController } = require('./BotSetupController');
const { CardController } = require('./CardController');
const { CustomerController } = require('./CustomerController');

global.CardController = CardController;
global.BotSetupController = BotSetupController;
global.CustomerController = CustomerController;