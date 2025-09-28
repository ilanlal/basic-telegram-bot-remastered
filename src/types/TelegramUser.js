/* eslint-disable no-undef */

// version: 1.0.0
class TelegramUser {
    getIsBot() {
        return this._is_bot;
    }

    setIsBot(isBot = false) {
        this._is_bot = isBot;
        return this;
    }

    getId() {
        return this._id;
    }

    setId(userId = 0) {
        this._id = userId;
        return this;
    }

    /** @returns {string | null} */
    getFirstName() {
        return this._first_name;
    }

    setFirstName(firstName = null) {
        this._first_name = firstName;
        return this;
    }

    /** @returns {string | null} */
    getLastName() {
        return this._last_name;
    }

    setLastName(lastName = null) {
        this._last_name = lastName;
        return this;
    }

    /** @returns {string | null} */
    getUsername() {
        return this._username;
    }

    setUsername(username = null) {
        this._username = username;
        return this;
    }

    getIsPremium() {
        return this._is_premium;
    }

    setIsPremium(isPremium = false) {
        this._is_premium = isPremium;
        return this;
    }

    getAddedToAttachmentMenu() {
        return this._added_to_attachment_menu;
    }

    setAddedToAttachmentMenu(addedToMenu = false) {
        this._added_to_attachment_menu = addedToMenu;
        return this;
    }

    getCanJoinGroups() {
        return this._can_join_groups;
    }

    setCanJoinGroups(canJoin = true) {
        this._can_join_groups = canJoin;
        return this;
    }

    getCanReadAllGroupMessages() {
        return this._can_read_all_group_messages;
    }

    setCanReadAllGroupMessages(canRead = false) {
        this._can_read_all_group_messages = canRead;
        return this;
    }

    getSupportsInlineQueries() {
        return this._supports_inline_queries;
    }

    setSupportsInlineQueries(supports = false) {
        this._supports_inline_queries = supports;
        return this;
    }

    getCanConnectToBusiness() {
        return this._can_connect_to_business;
    }

    setCanConnectToBusiness(canConnect = false) {
        this._can_connect_to_business = canConnect;
        return this;
    }

    getHasMainWebApp() {
        return this._has_main_web_app;
    }

    setHasMainWebApp(hasWebApp = false) {
        this._has_main_web_app = hasWebApp;
        return this;
    }

    getLanguageCode() {
        return this._language_code;
    }

    setLanguageCode(languageCode = null) {
        this._language_code = languageCode;
        return this;
    }

    constructor() {
        this._is_bot = false; // Default value, can be set later if needed
        this._id = 0;
        /** @type {string} */
        this._first_name = '';
        /** @type {string} */
        this._last_name = '';
        /** @type {string} */
        this._username = '';
        /** @type {string} */
        this._language_code = '';
        this._is_premium = false; // Default value, can be set later if needed
        this._added_to_attachment_menu = false; // Default value, can be set later if needed
        this._can_join_groups = true; // Default value, can be set later if needed
        this._can_read_all_group_messages = false; // Default value, can be set later if needed
        this._supports_inline_queries = false; // Default value, can be set later if needed
        this._can_connect_to_business = false; // Default value, can be set later if needed
        this._has_main_web_app = false; // Default value, can be set later if needed
    }

    static newTelegramUser() {
        return new TelegramUser();
    }

    static fromJsonString(text = '{}') {
        const data = JSON.parse(text);
        return new TelegramUser().fromObject(data);
    }

    fromObject(json = {}) {
        return this.setId(json._id)
            .setIsBot(json._is_bot)
            .setFirstName(json._first_name)
            .setLastName(json._last_name)
            .setUsername(json._username)
            .setLanguageCode(json._language_code)
            .setIsPremium(json._is_premium)
            .setAddedToAttachmentMenu(json._added_to_attachment_menu)
            .setCanJoinGroups(json._can_join_groups)
            .setCanReadAllGroupMessages(json._can_read_all_group_messages)
            .setSupportsInlineQueries(json._supports_inline_queries)
            .setCanConnectToBusiness(json._can_connect_to_business)
            .setHasMainWebApp(json._has_main_web_app);
    }



    toJsonString() {
        return JSON.stringify({
            _id: this.getId(),
            _is_bot: this.getIsBot(),
            _first_name: this.getFirstName(),
            _last_name: this.getLastName(),
            _username: this.getUsername(),
            _language_code: this.getLanguageCode(),
            _is_premium: this.getIsPremium(),
            _added_to_attachment_menu: this.getAddedToAttachmentMenu(),
            _can_join_groups: this.getCanJoinGroups(),
            _can_read_all_group_messages: this.getCanReadAllGroupMessages(),
            _supports_inline_queries: this.getSupportsInlineQueries(),
            _can_connect_to_business: this.getCanConnectToBusiness(),
            _has_main_web_app: this.getHasMainWebApp()
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TelegramUser };
}