const { WebhookHandler } = require('./bot/WebhookHandler');
const { PostMessageHandler } = require('./bot/PostMessageHandler');
const { PostCallbackQueryHandler } = require('./bot/PostCallbackQueryHandler');
const { EventHandler } = require('./EventHandler');
const { AutomationHandler } = require('./bot/AutomationHandler');
// Export handlers for use in Code.js

global.PostMessageHandler = PostMessageHandler;
global.PostCallbackQueryHandler = PostCallbackQueryHandler;
global.WebhookHandler = WebhookHandler;
global.AutomationHandler = AutomationHandler;
global.EventHandler = EventHandler;