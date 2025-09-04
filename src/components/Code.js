/* eslint-disable no-undef */
function onActivatePremium(e) {
    //console.log("onActivatePremium called with event:", e);
    try {
        return AccountControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .build()
            .activatePremium(e)
            .build();
    } catch (error) {
        console.error("Error in onActivatePremium:", error);
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}

function onRevokeLicense(e) {
    //console.log("onRevokeLicense called with event:", e);
    try {
        return AccountControllerFactory.create()
            .withUserStore(
                UserStoreFactory.newUserStoreFactory().build())
            .build()
            .revokePremium(e)
            .build();
    } catch (error) {
        console.error("Error in onRevokeLicense:", error);
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
        onActivatePremium,
        onRevokeLicense
    };
}
