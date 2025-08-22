// version: 1.0.0
class BotController {
    constructor(LOCALIZE_STRINGS = null, userStore = null) {
        this._services = {
            /** @type {UserStore | null} */
            _userStore: userStore,
        };
        this._models = {
            /** @type {Global_Resources['hl'] | null} */
            _LOCALIZE_STRINGS: LOCALIZE_STRINGS,
            /** @type {AuthUser | null} */
            _userInfo: this._services._userStore.getUserInfo(),
            /** @type {number | null} */
            _indentationLevel: this._services._userStore.getIndentSpaces(),
        };
    }

    static newBotController(LOCALIZE_STRINGS, userStore) {
        return new BotController(LOCALIZE_STRINGS, userStore);
    }

    validate() {
        if (!this._models._LOCALIZE_STRINGS) {
            throw new Error("Localization strings are required");
        }
        if (!(this._models._userInfo instanceof AuthUser)) {
            throw new Error("User info must be an instance of AuthUser");
        }

        if (typeof this._models._indentationLevel !== "number") {
            throw new Error("Indentation level must be a number");
        }

        return this;
    }

    navigateToHome() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        ViewBuilder.newBotHomeCard(
                            this._models._LOCALIZE_STRINGS,
                            this._models._indentationLevel,
                            this._models._userInfo
                        )
                        .validate()
                        .build()
                    )
            );
    }

    navigateToSetup() {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(
                        ViewBuilder.newBotSetupCard(
                            this._models._LOCALIZE_STRINGS,
                            this._models._indentationLevel,
                            this._models._userInfo
                        )
                        .validate()
                        .build()
                    )
            );
    }
}
