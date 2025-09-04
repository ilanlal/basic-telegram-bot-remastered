/* eslint-disable no-undef */

const {ReportItem} = require('./ReportItem');

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