const { ReportItem } = require('./ReportItem.js');
const { ValidationReport, ValidationReportBuilder } = require('./ValidationReport.js');

describe('ValidationReport Model Tests', () => {
    test('ValidationReport should be defined', () => {
        expect(ValidationReport).toBeDefined();
    });

    test('ValidationReport should have a default constructor', () => {
        const report = new ValidationReport();
        expect(report).toBeInstanceOf(ValidationReport);
        expect(report.getItems()).toEqual([]);
        expect(report.getEffectedCells()).toBe(0);
        expect(report.getSheetName()).toBe('');
        expect(report.getA1Notation()).toBe('');
    });

    test('ValidationReport should allow adding items', () => {
        const report = new ValidationReport();
        const item = { /* mock item data */ };
        report.addItem(item);
        expect(report.getItems()).toEqual([item]);
        expect(report.hasItems()).toBe(true);
    });

    test('ValidationReport should set and get properties correctly', () => {
        const report = new ValidationReport();
        report.setEffectedCells(5);
        report.setSheetName('Sheet1');
        report.setA1Notation('A1:B2');
        expect(report.getEffectedCells()).toBe(5);
        expect(report.getSheetName()).toBe('Sheet1');
        expect(report.getA1Notation()).toBe('A1:B2');
    });


    test('ReportItem should create a valid report item', () => {
        const item = ReportItem.newReportItem()
            .setSheetName('Sheet1')
            .setA1Notation('A1:B2')
            .setMessage('Invalid data')
            .setStatus('INVALID');

        expect(item.getSheetName()).toBe('Sheet1');
        expect(item.getA1Notation()).toBe('A1:B2');
        expect(item.getMessage()).toBe('Invalid data');
        expect(item.getStatus()).toBe('INVALID');
    });

    describe('ValidationReportBuilder Tests', () => {
        test('ValidationReportBuilder should build a ValidationReport correctly', () => {
            const builder = new ValidationReportBuilder();
            const report = builder
                .addItem(ReportItem.newReportItem().setSheetName('Sheet1').setA1Notation('A1:B2').setMessage('Invalid data').setStatus('INVALID'))
                .setEffectedCells(5)
                .setSheetName('Sheet1')
                .setA1Notation('A1:B2')
                .build();

            expect(report).toBeInstanceOf(ValidationReport);
            expect(report.getItems()).toHaveLength(1);
            expect(report.getEffectedCells()).toBe(5);
            expect(report.getSheetName()).toBe('Sheet1');
            expect(report.getA1Notation()).toBe('A1:B2');
        });
    });
});