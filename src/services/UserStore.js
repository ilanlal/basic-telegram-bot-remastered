// version: 2.0.0
// Google Apps Script code for Google Workspace Add-ons
class UserStore {
  static get TELEGRAM_BOT_INFO_KEY() {
    return "telegram_bot_info";
  }
  static get USER_INFO_KEY() {
    return 'auth_user_info';
  }
  static get INDENT_SPACES_KEY() {
    return 'indent_spaces';
  }
  static get USER_LICENSE_KEY() {
    return 'user_license';
  }
  static get LOCALE_KEY() {
    return 'locale';
  }
  static get DEBUG_MODE_KEY() {
    return 'debug_mode';
  }
  static get DEFAULT_LOCALE_CODE() {
    return 'en';
  }
  static get DEFAULT_INDENT_SPACES() {
    return 2;
  }

  constructor(userDataProvider) {
    this._userDataProvider = userDataProvider;
  }

  /**
   * Gets the localization for the user.
   * This function retrieves the user's localization setting from the user properties.
   * If no localization is set, it defaults to "en" (English).
   * @return {string} The user's localization setting, defaulting to "en".
   */
  getLocalizationCode() {
    return this._userDataProvider
      .getProperty(UserStore.LOCALE_KEY) || UserStore.DEFAULT_LOCALE_CODE;
  }

  /**
   * Sets the localization for the user.
   * @param {string} locale The locale to set, default is "en".
   */
  setLocalizationCode(locale = UserStore.DEFAULT_LOCALE_CODE) {
    this._userDataProvider.setProperty(UserStore.LOCALE_KEY, locale);
    return this;
  }

  /**
   * Gets the number of spaces for indentation.
   * @return {number} The number of spaces for indentation, defaulting to DEFAULT_INDENT_SPACES.
   */
  getIndentSpaces() {
    const spaces = this._userDataProvider.getProperty(UserStore.INDENT_SPACES_KEY);

    if (!spaces) {
      return this.DEFAULT_INDENT_SPACES; // Return default if not set or invalid
    }

    return parseInt(spaces);
  }

  /**
   * Sets the number of spaces for indentation.
   * @param {number} value The number of spaces for indentation, default is DEFAULT_INDENT_SPACES=2 constant.
   */
  setIndentSpaces(value = UserStore.DEFAULT_INDENT_SPACES) {
    this._userDataProvider.setProperty(UserStore.INDENT_SPACES_KEY, value);
    return this;
  }

  getUserInfo() {
    const data = this._userDataProvider
      .getProperty(UserStore.USER_INFO_KEY);

    try {
      return AuthUser.fromJsonString(data);
    } catch (error) {
      return new AuthUserBuilder().build();
    }
  }

  setUserInfo(userInfo) {
    this._userDataProvider.setProperty(
      UserStore.USER_INFO_KEY, userInfo?.toJsonString(userInfo));
    return this;
  }

  /**
   * Gets the license information for the user.
   * This function retrieves the user's license information from the user properties.
   *
   * @return {UserLicense | undefined} The user's license information, or undefined if not set.
   * @see UserLicense
   */
  getUserLicense() {
    const data = this._userDataProvider
      .getProperty(UserStore.USER_LICENSE_KEY);

    if (!data
      || data === "undefined"
      || data === "null"
      || data === ""
      || data === "[object Object]") {
      return undefined; // Return undefined if no license is set
    }

    return UserLicense.fromJsonString(data);
  }

  /**
   * Sets the license information for the user.
   * @param {UserLicense} license The license information to set.
   */
  setUserLicense(license) {
    if (!(license instanceof UserLicense) && !(license === undefined)) {
      throw new Error("Invalid license object provided. Must be an instance of UserLicense or undefined.");
    }

    if (license === undefined) {
      return this.clearUserLicense();
    }

    const licenseJson = UserLicense.toJsonString(license);

    this._userDataProvider.setProperty(UserStore.USER_LICENSE_KEY, licenseJson);
    return this;
  }

  clearUserLicense() {
    this._userDataProvider.deleteProperty(UserStore.USER_LICENSE_KEY);
    return this;
  }

  isInDebugMode() {
    const debugMode = this._userDataProvider.getProperty(UserStore.DEBUG_MODE_KEY);
    return debugMode === 'true';
  }

  setDebugMode(value = false) {
    this._userDataProvider.setProperty(UserStore.DEBUG_MODE_KEY, value);
    return this;
  }

  getTelegramBotInfo() {
    const data = this._userDataProvider.getProperty(UserStore.TELEGRAM_BOT_INFO_KEY);

    if (!data
      || data === "undefined"
      || data === "null"
      || data === ""
      || data === "[object Object]") {
      return undefined; // Return undefined if no bot info is set
    }

    return TelegramUser.fromJsonString(data);
  }

  /** @param {TelegramUser} user */
  setTelegramBotInfo(user) {
    if (!(user instanceof TelegramUser)) {
      throw new Error("Invalid TelegramUser object provided. Must be an instance of TelegramUser.");
    }

    this._userDataProvider.setProperty(UserStore.TELEGRAM_BOT_INFO_KEY, user.toJsonString());
    return this;
  }

  clearTelegramBotInfo() {
    this._userDataProvider.deleteProperty(UserStore.TELEGRAM_BOT_INFO_KEY);
    return this;
  }

  static newInstance() {
    return new UserStore(PropertiesService.getUserProperties());
  }
}