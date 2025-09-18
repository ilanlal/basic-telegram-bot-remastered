const { UserStore, UserStoreFactory } = require('./UserStore');
const {WebhookHandler} = require('../services/WebhookHandler');

global.WebhookHandler = WebhookHandler;
global.UserStore = UserStore;
global.UserStoreFactory = UserStoreFactory;