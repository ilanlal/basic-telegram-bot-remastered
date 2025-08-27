const { AuthUser } = require('./AuthUser');
const { TelegramBotInfo } = require('./TelegramBotInfo');
const { TelegramUser } = require('./TelegramUser');
const { UserLicense } = require('./UserLicense');
const { ReportItem } = require('./ReportItem');
const { ValidationReport, ValidationReportBuilder } = require('./ValidationReport');

global.AuthUser = AuthUser;
global.TelegramUser = TelegramUser;
global.TelegramBotInfo = TelegramBotInfo;
global.UserLicense = UserLicense;
global.ReportItem = ReportItem;
global.ValidationReport = ValidationReport;
global.ValidationReportBuilder = ValidationReportBuilder;

