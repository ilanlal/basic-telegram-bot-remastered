const { UserStore, UserStoreFactory } = require('./UserStore');
const { WebhookHandler } = require('../services/WebhookHandler');
const { PostMessageHandler } = require('../services/PostMessageHandler');
const { PostCallbackQueryHandler } = require('../services/PostCallbackQueryHandler');
const { SpreadsheetStore } = require('./SpreadsheetStore');

// Expose classes to global scope for Google Apps Script
global.SpreadsheetStore = SpreadsheetStore;    
global.PostMessageHandler = PostMessageHandler;
global.PostCallbackQueryHandler = PostCallbackQueryHandler;
global.WebhookHandler = WebhookHandler;
global.UserStore = UserStore;
global.UserStoreFactory = UserStoreFactory;