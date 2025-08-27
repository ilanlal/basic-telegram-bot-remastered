/* eslint-disable no-undef */

class AccountController {
    get userStore() {
        return this._service.userStore;
    }
    
    getUserInfo() {
        return this.userStore?.getUserInfo() || {};
    }

    constructor(userStore = null) {
        this._service = {
            userStore: null
        }

        this.DEFAULT_INDENT_SPACES = new UserStore()._DEBUG_MODE_KEY;
    }

    /**
     * Creates a card for account management.
     * @returns {CardService.ActionResponse}
     */
    navigateToHome() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(new AccountCard()
                        .withUserInfo(this.getUserInfo())
                        .build()
                    )
            );
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
        const newUserLicense = new UserLicenseBuilder()
            .setUserId(userId)
            .setPlanId(planId)
            .setExpirationDate(expirDate)
            .setAmount(amount)
            .build();

        this.userStore.setUserLicense(newUserLicense);

        // navigate to root
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .withUserInfo(this.getUserInfo())
                            .build()
                    ));
    }

    revokePremium(e) {
        this.userStore.clearUserLicense();

        // navigate to root
        return CardService
            .newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(
                        new HomeCard()
                            .withUserInfo(this.getUserInfo())
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

class AccountControllerFactory {
    constructor() {
        this._userStore = null;
    }

    withUserStore(userStore) {
        this._userStore = userStore;
        return this;
    }

    build() {
        return new AccountController(
            this._userStore
        );
    }

    static create() {
        return new AccountControllerFactory();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { AccountController, AccountControllerFactory };
}