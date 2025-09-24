function onDefaultHomePageOpen(e) {
    //console.log("onDefaultHomePageOpen called with event:", e);
    try {
        return BotControllerFactory.create()
            .withUserStore(new UserStore())
            .build()
            .navigateToHome()
            .build();
    } catch (error) {
        console.error("Error in onDefaultHomePageOpen:", error);
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}

function onOpenAccountCard(e) {
    //console.log("onOpenAccountCard called with event:", e);
    try {
        return AccountControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .build()
            .navigateToHome()
            .build();

    } catch (error) {
        console.error("Error in onOpenAccountCard:", error);
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}

function onShowAboutCard(e) {
    //console.log("onShowAboutCard called with event:", e);
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
        console.error("Error in onShowAboutCard:", error);
        return CardService.newActionResponseBuilder()
            .setNotification(CardService.newNotification()
                .setText(error.toString()))
            .build();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        onDefaultHomePageOpen,
        onOpenAccountCard,
        onShowAboutCard
    };
}