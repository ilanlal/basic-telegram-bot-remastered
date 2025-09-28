/* eslint-disable no-undef */
// version: 2.0.0
class UserStore {
  constructor() {
    this._userProperties = PropertiesService
      .getUserProperties();
  }

  getLocalizationCode() {
    return this._userProperties
      .getProperty(UserStore.Keys.LOCALE)
      || UserStore.DEFAULTS.LOCALE;
  }

  setLocalizationCode(locale = UserStore.DEFAULTS.LOCALE) {
    this._userProperties
      .setProperty(UserStore.Keys.LOCALE, locale);
    return this;
  }

  getIndentSpaces() {
    const spaces = this._userProperties
      .getProperty(UserStore.Keys.INDENT_SPACES);

    if (!spaces) {
      return UserStore.DEFAULTS.INDENT_SPACES;
    }

    return parseInt(spaces);
  }

  setIndentSpaces(value = UserStore.DEFAULTS.INDENT_SPACES) {
    this._userProperties.setProperty(UserStore.Keys.INDENT_SPACES, value);
    return this;
  }

  getUserInfo() {
    const data = this._userProperties
      .getProperty(UserStore.Keys.USER_INFO);

    try {
      return AuthUser.fromJsonString(data);
    } catch (error) {
      return new AuthUser();
    }
  }

  setUserInfo(userInfo) {
    this._userProperties.setProperty(
      UserStore.Keys.USER_INFO, userInfo?.toJsonString(userInfo));
    return this;
  }

  getUserLicense() {
    const data = this._userProperties
      .getProperty(UserStore.Keys.USER_LICENSE);

    if (!data
      || data === "undefined"
      || data === "null"
      || data === ""
      || data === "[object Object]") {
      return undefined; // Return undefined if no license is set
    }

    return UserLicense.fromJsonString(data);
  }

  setUserLicense(license) {
    if (!(license instanceof UserLicense) && !(license === undefined)) {
      throw new Error("Invalid license object provided. Must be an instance of UserLicense or undefined.");
    }

    if (license === undefined) {
      return this.clearUserLicense();
    }

    const licenseJson = license.toJsonString();

    this._userProperties
      .setProperty(UserStore.Keys.USER_LICENSE, licenseJson);
    return this;
  }

  clearUserLicense() {
    this._userProperties
      .deleteProperty(UserStore.Keys.USER_LICENSE);
    return this;
  }

  isInDebugMode() {
    const debugMode = this._userProperties
      .getProperty(UserStore.Keys.DEBUG_MODE);
    return debugMode === 'true';
  }

  setDebugMode(value = false) {
    this._userProperties
      .setProperty(UserStore.Keys.DEBUG_MODE, value);
    return this;
  }

  getTelegramBotInfo() {
    const data = this._userProperties
      .getProperty(UserStore.Keys.TELEGRAM_BOT_INFO);

    if (!data
      || data === "undefined"
      || data === "null"
      || data === ""
      || data === "[object Object]") {
      return undefined; // Return undefined if no bot info is set
    }

    return TelegramBotInfo.fromJsonString(data);
  }

  /** @param {TelegramBotInfo} botInfo */
  setTelegramBotInfo(botInfo) {
    if (!(botInfo instanceof TelegramBotInfo)) {
      throw new Error("Invalid TelegramBotInfo object provided. Must be an instance of TelegramBotInfo.");
    }

    this._userProperties.setProperty(
      UserStore.Keys.TELEGRAM_BOT_INFO,
      botInfo.toJsonString());
    return this;
  }

  clearTelegramBotInfo() {
    this._userProperties
      .deleteProperty(UserStore.Keys.TELEGRAM_BOT_INFO);
    return this;
  }

  getDeploymentId() {
    const deploymentId = this._userProperties
      .getProperty(UserStore.Keys.DEPLOYMENT_ID);
    return deploymentId;
  }

  setDeploymentId(deploymentId) {
    this._userProperties
      .setProperty(UserStore.Keys.DEPLOYMENT_ID, deploymentId);
    return this;
  }
}

class UserStoreFactory {
  constructor() {
    this._userStore = null;
  }

  get current() {
    if (!this._userStore) {
      this._userStore = new UserStore();
    }
    return this._userStore;
  }

  get next() {
    this._userStore = new UserStore();
    return this._userStore;
  }

  static create() {
    return new UserStoreFactory();
  }
}
UserStore.DEFAULTS = {
  LOCALE: 'en',
  INDENT_SPACES: 2,
  DEBUG_MODE: false
};
UserStore.Keys = {
  BOT_TOKEN: 'bot_token',
  DEPLOYMENT_ID: 'deployment_id',
  TELEGRAM_BOT_INFO: 'telegram_bot_info',
  USER_INFO: 'auth_user_info',
  INDENT_SPACES: 'indent_spaces',
  USER_LICENSE: 'user_license',
  LOCALE: 'locale',
  DEBUG_MODE: 'debug_mode'
};

UserStoreFactory.instance = UserStoreFactory.create();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    UserStore,
    UserStoreFactory
  };
}