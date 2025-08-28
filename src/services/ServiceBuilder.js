// version: 1.2.0
class ServiceBuilder {
    static newJsonStudio() {
        return JsonStudio.newInstance();
    }

    static newRangeReport() {
        return RangeReport.newRangeReport();
    }

    static newUserStore() {
        return UserStore.newInstance();
    }

    static newSpreadsheetService(sheetName = null) {
        return SpreadsheetService.newSpreadsheetService(
            SpreadsheetApp.getActiveSpreadsheet(), sheetName);
    }

    static newRangeService(sheetName, a1Notation) {
        return RangeService.newRangeService(sheetName, a1Notation);
    }
}