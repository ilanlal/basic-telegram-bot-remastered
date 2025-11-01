const { WebhookHandler } = require('./bot/WebhookHandler');
const { PostMessageHandler } = require('./bot/PostMessageHandler');
const { PostCallbackQueryHandler } = require('./bot/PostCallbackQueryHandler');
const { EventHandler } = require('./EventHandler');
// Export handlers for use in Code.js

global.PostMessageHandler = PostMessageHandler;
global.PostCallbackQueryHandler = PostCallbackQueryHandler;
global.WebhookHandler = WebhookHandler;
global.EventHandler = EventHandler;