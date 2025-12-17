const { AutomationModel } = require('./AutomationModel');
const { SetupFlow } = require('./SetupFlow');
const { SheetModel } = require('./SheetModel');
const { EnvironmentModel } = require('./EnvironmentModel');
const { LoggerModel } = require('./LoggerModel');
const { BotSheetModel } = require('./BotSheetModel');
const { CustomerModel } = require('./CustomerModel');
const { WidgetModel } = require('./WidgetModel');
const { ChannelsModel } = require('./ChannelsModel');

// Export all models
global.AutomationModel = AutomationModel;
global.SetupFlow = SetupFlow;
global.SheetModel = SheetModel;
global.EnvironmentModel = EnvironmentModel;
global.LoggerModel = LoggerModel;
global.BotSheetModel = BotSheetModel;
global.CustomerModel = CustomerModel;
global.WidgetModel = WidgetModel;
global.ChannelsModel = ChannelsModel;