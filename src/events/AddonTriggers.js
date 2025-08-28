// Google Apps Script file for handling add-on triggers and events

const { AccountControllerFactory } = require && require("../components/controllers/AccountController");
const { AboutControllerFactory } = require && require("../components/controllers/AboutController");
const { BotControllerFactory } = require && require("../components/controllers/BotController");
const { UserStoreFactory } = require && require("../services/UserStore");
const { TelegramBotClientFactory } = require && require("../libs/TelegramBotClient");
/**
 * Callback for the add-on homepage.
 * This function is called when the user opens the add-on.
 * It returns the home card to be displayed in the sidebar.
 * @see appsscript.json -->homepageTrigger
 */
function onDefaultHomePageOpen(e) {
    console.log("onDefaultHomePageOpen called with event:", e);
    try {
        return BotControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .withTelegramBotClient(
                TelegramBotClientFactory
                    .newTelegramBotClientFactory()
                    .withToken('_dummy_token_')
                    .build())
            .build()
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

function onOpenAccountCard(e) {
    console.log("onOpenAccountCard called with event:", e);
    try {
        return AccountControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .build()
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

function onShowAboutCard(e) {
    console.log("onShowAboutCard called with event:", e);
    try {
        return AboutControllerFactory.create()
            .withPackageInfo({
                name: "My Add-on",
                version: "1.0.0",
                author: "Your Name",
                build: "1.0.0",
                description: "This is my add-on"
            })
            .build()
            .navigateHome()
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
        return AccountControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .build()
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
        return AccountControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .build()
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
        return BotControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .withTelegramBotClient(
                TelegramBotClientFactory.newTelegramBotClientFactory()
                    .withToken('_dummy_token_')
                    .build())
            .build()
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        onDefaultHomePageOpen,
        onOpenAccountCard,
        onShowAboutCard,
        onActivatePremium,
        onRevokeLicense,
        onNewBotToken,
        onCancelBotSetup
    };
}