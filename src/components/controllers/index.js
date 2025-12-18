const { BotSetupController } = require('./BotSetupController');
const { CustomerController } = require('./CustomerController');

// Export controllers for global access in Google Apps Script environment
global.BotSetupController = BotSetupController;
global.CustomerController = CustomerController;