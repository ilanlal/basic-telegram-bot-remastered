/* eslint-disable no-undef */
class AccountController {
    getUserInfo() {
        return this._userStore?.getUserInfo() || {};
    }

    constructor(userStore) {
        this._userStore = userStore;
    }

    static create(userStore = new UserStore()) {
        return new AccountController(userStore);
    }

    activatePremium(e) {
        // Set the user license in the UserStore
        const userId = e?.parameters?.userId || '_user'; // Assuming 'me' refers to the current user
        const planId = e?.parameters?.planId || '_plan'; // Default to 'premium' plan
        const days = parseInt(e?.parameters?.days || 1);
        const createdOn = new Date();
        const milliseconds = days * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        const expirDate = new Date(createdOn.getTime() + milliseconds); // Calculate expiration date
        const amount = 0; // Assuming no cost for the trial
        const newUserLicense = new UserLicense()
            .setUserId(userId)
            .setPlanId(planId)
            .setExpirationDate(expirDate)
            .setAmount(amount);

        this._userStore.setUserLicense(newUserLicense);

        // navigate to root
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .build()
                    ));
    }

    revokePremium(e) {
        this._userStore.clearUserLicense();

        // navigate to root
        return CardService
            .newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .build()
                    ));

    }

    /**
     * @returns {CardService.ActionResponse}
     */
    handleOperationSuccess() {
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText("Operation completed successfully!"))
            .setStateChanged(false);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { AccountController };
}