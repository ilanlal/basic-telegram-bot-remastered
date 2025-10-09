const { UserStore, UserStoreFactory } = require('./UserStore');
const { SpreadsheetService } = require('../services/SpreadsheetService');
const { RepliesSheetService } = require('../services/RepliesSheetService');
    
global.UserStoreFactory = UserStoreFactory;
global.RepliesSheetService = RepliesSheetService;
global.SpreadsheetService = SpreadsheetService;
global.UserStore = UserStore;