const { WebhookHandler } = require('./webhook/WebhookHandler');
const { PostMessageHandler } = require('./webhook/PostMessageHandler');
const { PostCallbackQueryHandler } = require('./webhook/PostCallbackQueryHandler');
const { EventHandler } = require('./EventHandler');
const { AutomationHandler } = require('./webhook/AutomationHandler');
const { CardHandler } = require('./CardHandler');
const { EnvironmentHandler } = require('./EnvironmentHandler');
const { BotHandler } = require('./BotHandler');
// Export handlers for use in Code.js


global.CardHandler = CardHandler;
global.PostMessageHandler = PostMessageHandler;
global.PostCallbackQueryHandler = PostCallbackQueryHandler;
global.WebhookHandler = WebhookHandler;
global.AutomationHandler = AutomationHandler;
global.EventHandler = EventHandler;
global.EnvironmentHandler = EnvironmentHandler;
global.BotHandler = BotHandler;