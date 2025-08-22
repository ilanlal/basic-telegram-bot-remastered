const { ReportItem, ReportItemBuilder } = require('./ReportItem.js');

describe('ReportItem Model Tests', () => {
    test("ReportItem should be defined", () => {
        expect(ReportItem).toBeDefined();
    });

    test("ReportItem should have a default constructor", () => {
        const reportItem = new ReportItem();
        expect(reportItem).toBeDefined();
        expect(reportItem.getSheetName()).toBe("");
        expect(reportItem.getA1Notation()).toBe("");
        expect(reportItem.getMessage()).toBe("");
        expect(reportItem.getStatus()).toBe("INVALID");
    });
});

describe('ReportItemBuilder Tests', () => {
    test("ReportItemBuilder should build ReportItem correctly", () => {
        const reportItem = new ReportItemBuilder()
            .setSheetName("Sheet1")
            .setA1Notation("A1")
            .setMessage("Test message")
            .setStatus("VALID")
            .build();

        expect(reportItem).toBeDefined();
        expect(reportItem.getSheetName()).toBe("Sheet1");
        expect(reportItem.getA1Notation()).toBe("A1");
        expect(reportItem.getMessage()).toBe("Test message");
        expect(reportItem.getStatus()).toBe("VALID");
    });
});