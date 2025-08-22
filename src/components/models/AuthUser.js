// version: 2.0.0
// Google Apps Script code for Google Workspace Add-ons
class AuthUser {
    setUserLicense(userLicense) {
        this.userLicense = userLicense;
        return this;
    }

    getUserLicense() {
        return this.userLicense;
    }

    setUserLocaleCode(localeCode) {
        this.userLocaleCode = localeCode;
        return this;
    }

    getUserLocaleCode() {
        return this.userLocaleCode;
    }

    setUserId(userId) {
        this.userId = userId;
        return this;
    }

    getUserId() {
        return this.userId;
    }

    setUserCountry(country) {
        this.userCountry = country;
        return this;
    }

    getUserCountry() {
        return this.userCountry;
    }

    setUserTimezone(timezone) {
        this.userTimezone = timezone;
        return this;
    }

    getUserTimezone() {
        return this.userTimezone;
    }

    constructor() {
        this.userId = null;
        this.userCountry = null;
        this.userTimezone = null;
        this.userLicense = null;
        this.userLocaleCode = "en"; // Default locale code
    }

    static newAuthUser() {
        return new AuthUser();
    }
    
    static fromJsonString(json = '{}') {
        // Parse the JSON string into a UserInfo object
        const data = JSON.parse(json, (key, value) => {
            if (key === 'createdOn') {
                return new Date(value); // Convert date strings back to Date objects
            }
            return value;
        });

        return new AuthUser().fromObject(data);
    }

    fromObject(json = {}) {
        return new AuthUser()
            .setUserId(json.userId)
            .setUserCountry(json.userCountry)
            .setUserTimezone(json.userTimezone)
            .setUserLicense(json.userLicense)
            .setUserLocaleCode(json.userLocaleCode);
    }

    toJsonString() {
        return JSON.stringify({
            userId: this.getUserId(),
            userLicense: this.getUserLicense(),
            userCountry: this.getUserCountry(),
            userTimezone: this.getUserTimezone(),
            userLocaleCode: this.getUserLocaleCode(),
        });
    }
}

class AuthUserBuilder {
    constructor() {
        this.authUser = AuthUser.newAuthUser();
    }

    setUserId(userId) {
        this.authUser.setUserId(userId);
        return this;
    }

    setUserCountry(country) {
        this.authUser.setUserCountry(country);
        return this;
    }

    setUserTimezone(timezone) {
        this.authUser.setUserTimezone(timezone);
        return this;
    }

    setUserLicense(userLicense) {
        this.authUser.setUserLicense(userLicense);
        return this;
    }

    setUserLocaleCode(localeCode) {
        this.authUser.setUserLocaleCode(localeCode);
        return this;
    }

    build() {
        return this.authUser;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {AuthUser, AuthUserBuilder};
}