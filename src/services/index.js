const { UserStore, UserStoreFactory } = require('./UserStore');
const { SpreadsheetService } = require('../services/SpreadsheetService');
    
global.UserStoreFactory = UserStoreFactory;
global.SpreadsheetService = SpreadsheetService;
global.UserStore = UserStore;