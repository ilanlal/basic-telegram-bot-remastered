const { EntityModel } = require('./EntityModel');
const { Section } = require('./Section');
const { Widget } = require('./Widget');
const { AutomationModel } = require('./AutomationModel');
const { SetupFlow } = require('./SetupFlow');
const { Settings } = require('./Settings');
const { Attribute } = require('./Attribute');
const { BotModel } = require('./BotModel');
const { Lights } = require('./Lights');
const { SheetModel } = require('./SheetModel');

// Expose globally for tests and other scripts
global.Attribute = Attribute;
global.AutomationModel = AutomationModel;
global.SetupFlow = SetupFlow;
global.BotModel = BotModel;
global.Lights = Lights;
global.Settings = Settings;
global.EntityModel = EntityModel;
global.Section = Section;
global.Widget = Widget;
global.SheetModel = SheetModel;
