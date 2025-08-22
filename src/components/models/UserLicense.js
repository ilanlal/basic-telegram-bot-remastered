// version 2.0.0
// Google Apps Script code for Google Workspace Add-ons
class UserLicense {
    setCreatedOn(createdOn) {
        this._createdOn = createdOn;
        return this;
    }

    getCreatedOn() {
        return this._createdOn;
    }

    setAmount(amount) {
        this._amount = amount;
        return this;
    }

    getAmount() {
        return this._amount;
    }

    setPlanId(planId) {
        this._planId = planId;
        return this;
    }

    getPlanId() {
        return this._planId;
    }

    setUserId(userId) {
        this._userId = userId;
        return this;
    }

    getUserId() {
        return this._userId;
    }

    setExpirationDate(expirationDate) {
        this._expirationDate = expirationDate;
        return this;
    }

    getExpirationDate() {
        return this._expirationDate;
    }

    constructor() {
        this._userId = '';
        this._planId = '';
        /** @type {Date | null} */
        this._createdOn = null;
        /** @type {Date | null} */
        this._expirationDate = null;
        this._amount = 0;
    }

    static newUserLicense() {
        return new UserLicense();
    }

    static fromJsonString(json = '{}') {
        // Parse the JSON string into a UserLicense object
        const data = JSON.parse(json, (key, value) => {
            if (key === 'createdOn' || key === 'expirationDate') {
                return new Date(value); // Convert date strings back to Date objects
            }
            return value;
        });

        return new UserLicense().fromObject(data);
    }

    /**
     * Check if the license is active based on the current date and expiration date.
     * @returns {boolean} - True if the license is active, false otherwise
     */
    isActive() {
        // Check if the license is active based on the current date and expiration date
        const now = new Date();
        return (now < new Date(this._expirationDate)) || this._amount > 0;
    }

    fromObject(json = {}) {
        this._userId = json.userId;
        this._planId = json.planId;
        this._createdOn = json.createdOn;
        this._expirationDate = json.expirationDate;
        this._amount = json.amount;
        return this;
    }

    toJsonString() {
        return JSON.stringify({
            userId: this._userId,
            planId: this._planId,
            createdOn: this._createdOn,
            expirationDate: this._expirationDate,
            amount: this._amount
        });
    }
}

class UserLicenseBuilder {
    constructor() {
        this._userLicense = new UserLicense();
    }

    setCreatedOn(createdOn) {
        this._userLicense.setCreatedOn(createdOn);
        return this;
    }

    setAmount(amount) {
        this._userLicense.setAmount(amount);
        return this;
    }

    setPlanId(planId) {
        this._userLicense.setPlanId(planId);
        return this;
    }

    setUserId(userId) {
        this._userLicense.setUserId(userId);
        return this;
    }

    setExpirationDate(expirationDate) {
        this._userLicense.setExpirationDate(expirationDate);
        return this;
    }

    build() {
        return this._userLicense;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UserLicense, UserLicenseBuilder };
}