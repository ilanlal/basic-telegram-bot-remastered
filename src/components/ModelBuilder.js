// version: 1.0.1
class ModelBuilder {
    static newReportItem(sheetName = null) {
        return ReportItem.newReportItem()
            .setSheetName(sheetName);
    }

    static newRangeReport(sheetName = null) {
        return RangeReport.newRangeReport()
            .setSheetName(sheetName);
    }

    static newUserLicense() {
        return UserLicense.newUserLicense();
    }

    static newUserInfo() {
        return UserInfo.newUserInfo()
            .setUserId("_user_" + new Date().getTime()) // Generate a unique user ID based on the current timestamp
            .setUserLicense(ModelBuilder.newUserLicense())
            .setUserLocaleCode("en") // Default locale code
            .setUserCountry("US") // Default country
            .setUserTimezone({ timeZone: "GMT", offset: 0 }); // Default timezone
    }
}