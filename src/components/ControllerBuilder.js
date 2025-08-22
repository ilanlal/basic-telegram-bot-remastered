// version: 1.2.0
class ControllerBuilder {
    static newHomeController(
        localization = AppManager.getLocalizationResources(),
        userStore = ServiceBuilder.newUserStore(),
        userInfo
    ) {
        return HomeController.newHomeController(localization, userStore, userInfo);
    }

    static newJsonStudioController(
        localization = AppManager.getLocalizationResources(),
        userStore = ServiceBuilder.newUserStore(),
        userInfo
    ) {
        return JsonStudioController.newJsonStudioController(localization, userStore, userInfo);
    }

    static newAccountController(
        localization = AppManager.getLocalizationResources(),
        userStore = ServiceBuilder.newUserStore(),
        userInfo
    ) {
        return AccountController.newAccountController(localization, userStore, userInfo);
    }

    static newReportController(
        localization = AppManager.getLocalizationResources(),
        userStore = ServiceBuilder.newUserStore(),
        userInfo
    ) {
        return ReportController.newReportController(localization, userStore, userInfo);
    }

    static newAboutController(
        localization = AppManager.getLocalizationResources(),
        userStore = ServiceBuilder.newUserStore(),
        userInfo
    ) {
        return AboutController.newAboutController(localization, userStore, userInfo);
    }

    static newBotController(
        LOCALIZE_STRINGS = AppManager.getLocalizationResources(),
        userStore = ServiceBuilder.newUserStore()
    ) {
        return BotController.newBotController(
            LOCALIZE_STRINGS, userStore);
    }
}