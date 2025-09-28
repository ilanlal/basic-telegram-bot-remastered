const { AuthUser } = require('./AuthUser');
const { TelegramBotInfo } = require('./TelegramBotInfo');
const { TelegramUser } = require('./TelegramUser');
const { UserLicense } = require('./UserLicense');

global.AuthUser = AuthUser;
global.TelegramUser = TelegramUser;
global.TelegramBotInfo = TelegramBotInfo;
global.UserLicense = UserLicense;

