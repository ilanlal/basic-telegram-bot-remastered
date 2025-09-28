const { UserStore, UserStoreFactory } = require('./UserStore');
const { SpreadsheetService } = require('../services/SpreadsheetService');

global.SpreadsheetService = SpreadsheetService;
global.UserStore = UserStore;
global.UserStoreFactory = UserStoreFactory;