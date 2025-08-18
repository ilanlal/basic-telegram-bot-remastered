// version: 1.0.1
// Google Apps Script code for Google Workspace Add-ons
class UserInfo {    
    constructor() {
    }

    setUserLicense(userLicense) {
        this.userLicense = userLicense;
        return this;
    }

    getUserLicense() {
        return this.userLicense || ModelBuilder.newUserLicense();
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

    static fromJsonText(json = '{}') {
        // Parse the JSON string into a UserInfo object
        const data = JSON.parse(json, (key, value) => {
            if (key === 'createdOn') {
                return new Date(value); // Convert date strings back to Date objects
            }
            return value;
        });

        return new UserInfo()
            .setUserId(data.userId)
            .setUserCountry(data.userCountry)
            .setUserTimezone(data.userTimezone)
            .setUserLicense(data.userLicense)
            .setUserLocaleCode(data.userLocaleCode);
    }

    static toJsonText(userInfo) {
        if (!(userInfo instanceof UserInfo)) {
            throw new Error("Invalid UserInfo object.");
        }

        return JSON.stringify({
            userId: userInfo.getUserId(),
            userLicense: userInfo.getUserLicense(),
            localization: userInfo.getUserLocaleCode(),
            userCountry: userInfo.getUserCountry(),
            userTimezone: userInfo.getUserTimezone(),
            userLocaleCode: userInfo.getUserLocaleCode(),
        });
    }

    static newUserInfo() {
        return new UserInfo();
    }
}