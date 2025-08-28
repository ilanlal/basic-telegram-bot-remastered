/* eslint-disable no-undef */

class AboutController {
    get packageInfo() {
        return this._packageInfo;
    }

    constructor(packageInfo = null) {
        this._packageInfo = packageInfo;
    }

    /**
    * @returns {CardService.ActionResponse}
    */
    navigateHome() {
        return CardService.newActionResponseBuilder()
            .setNavigation(CardService
                .newNavigation()
                .pushCard(new AboutCard()
                    .withPackageInfo(this.packageInfo)
                    .build()));
    }
}

class AboutControllerFactory {
    constructor() {
        this._packageInfo = null;
        this._userStore = null;
    }

    withPackageInfo(packageInfo) {
        this._packageInfo = packageInfo;
        return this;
    }

    build() {
        return new AboutController(
            this._packageInfo
        );
    }

    static create() {
        return new AboutControllerFactory();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { AboutController, AboutControllerFactory };
}