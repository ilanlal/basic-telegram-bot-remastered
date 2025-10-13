const { Entity } = require('./Entity');
const { Attribute } = require('./Attribute');
const { AutomationReply } = require('./AutomationReply');
const { SetupFlow } = require('./SetupFlow');
const { Settings } = require('./Settings');

global.Attribute = Attribute;
global.AutomationReply = AutomationReply;
global.SetupFlow = SetupFlow;
global.Settings = Settings;
global.Entity = Entity;
