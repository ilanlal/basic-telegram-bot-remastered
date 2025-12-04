const { EntityModel } = require('./EntityModel');
const { Section } = require('./card/Section');
const { Widget } = require('./card/Widget');
const { AutomationModel } = require('./AutomationModel');
const { SetupFlow } = require('./SetupFlow');
const { SheetModel } = require('./SheetModel');
const { EnvironmentModel } = require('./EnvironmentModel');
const { LoggerModel } = require('./LoggerModel');
const { BotModel } = require('./BotModel');
const { CustomerModel } = require('./CustomerModel');

// Expose globally for tests and other scripts
global.AutomationModel = AutomationModel;
global.SetupFlow = SetupFlow;
global.EntityModel = EntityModel;
global.Section = Section;
global.Widget = Widget;
global.SheetModel = SheetModel;
global.EnvironmentModel = EnvironmentModel;
global.LoggerModel = LoggerModel;
global.BotModel = BotModel;
global.CustomerModel = CustomerModel;