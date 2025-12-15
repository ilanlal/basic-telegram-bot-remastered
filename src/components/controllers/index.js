const { BotSetupController } = require('./BotSetupController');
const { CardController } = require('./CardController');
const { CustomerController } = require('./CustomerController');
const { SpreadsheetController } = require('./SpreadsheetController');
const { CardNavigationsController } = require('./CardNavigationsController');

// Export controllers for global access in Google Apps Script environment
global.CardController = CardController;
global.BotSetupController = BotSetupController;
global.CustomerController = CustomerController;
global.SpreadsheetController = SpreadsheetController;
global.CardNavigationsController = CardNavigationsController;