const { Entity } = require('./Entity');
const { Section } = require('./Section');
const { Widget } = require('./Widget');
const { AutomationReply } = require('./AutomationReply');
const { SetupFlow } = require('./SetupFlow');
const { Settings } = require('./Settings');

global.AutomationReply = AutomationReply;
global.SetupFlow = SetupFlow;
global.Settings = Settings;
global.Entity = Entity;
global.Section = Section;
global.Widget = Widget;
