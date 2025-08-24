// Google Apps Script file for handling add-on triggers and events

/**
 * Callback for the add-on homepage.
 * This function is called when the user opens the add-on.
 * It returns the home card to be displayed in the sidebar.
 * @see appsscript.json -->homepageTrigger
 */
function onDefaultHomePageOpen(e) {
    console.log("onDefaultHomePageOpen called with event:", e);
    try {
        return BotControllerFactory.newBotControllerFactory()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .withTelegramBotClient(
                TelegramBotClientFactory.newTelegramBotClientFactory().build())
            .build(AppManager.getLocalizationResources())
            .navigateToHome()
            .build();
    } catch (error) {
        SpreadsheetApp
            .getActiveSpreadsheet()
            .toast(
                error.message || error.toString(),
                "Error",
                15);
    }
}

function onOpenAccountCard(e) {
    console.log("onOpenAccountCard called with event:", e);
    try {
        return ControllerBuilder.newAccountController()
            .setUserInfo(new AuthUserBuilder()
                .setUserId('_user')
                .setUserLocaleCode(e?.commonEventObject?.userLocale || 'en')
                .setUserCountry(e?.commonEventObject?.userCountry || 'US')
                .setUserTimezone(e?.commonEventObject?.userTimezone || Session.getScriptTimeZone())
                .setUserLicense(
                    ServiceBuilder.newUserStore().getUserLicense())
                .build())
            .home()
            .build();

    } catch (error) {
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}

function onShowAboutCard(e) {
    console.log("onShowAboutCard called with event:", e);
    try {
        return ControllerBuilder.newAboutController()
            .home()
            .build();
    } catch (error) {
        return CardService.newActionResponseBuilder()
            .setNotification(CardService.newNotification()
                .setText(error.toString()))
            .build();
    }
}

function onActivatePremium(e) {
    console.log("onActivatePremium called with event:", e);
    try {
        return ControllerBuilder.newAccountController()
            .activatePremium(e)
            .build();
    } catch (error) {
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}

function onRevokeLicense(e) {
    console.log("onRevokeLicense called with event:", e);
    try {
        return ControllerBuilder.newAccountController()
            .revokePremium(e)
            .build();
    } catch (error) {
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}

function onNewBotToken(e) {
    console.log("onNewBotToken called with event:", e);
    try {
        return ControllerBuilder
            .newBotController(
                AppManager.getLocalizationResources(),
                ServiceBuilder.newUserStore())
            .saveBotToken(e)
            .build();
    } catch (error) {
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}

function onCancelBotSetup(e) {
    console.log("onCancelBotSetup called with event:", e);
    try {
        return ControllerBuilder.newBotController(
            AppManager.getLocalizationResources(),
            ServiceBuilder.newUserStore())
            .navigateToHome()
            .build();
    } catch (error) {
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}