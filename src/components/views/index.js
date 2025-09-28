const HomeCard = require('./HomeCard');
const NewBotTokenCard = require('./NewBotTokenCard');
const AboutCard = require('./AboutCard');
const AccountCard = require('./AccountCard');
const BotSettingsCard = require('./BotSettingsCard');
const BotAutomationsCard = require('./BotAutomationsCard');
const { UsersManagementCard } = require('./UsersManagementCard');
const { NewDeploymentIdCard } = require('./NewDeploymentIdCard');

global.NewDeploymentIdCard = NewDeploymentIdCard;
global.UsersManagementCard = UsersManagementCard;
global.HomeCard = HomeCard;
global.NewBotTokenCard = NewBotTokenCard;
global.AboutCard = AboutCard;
global.AccountCard = AccountCard;
global.BotSettingsCard = BotSettingsCard;
global.BotAutomationsCard = BotAutomationsCard;
