/* eslint-disable no-undef */
// version: 1.0.0
class ValidationReport {
    getItems() {
        return this._items;
    }

    /** @param {ReportItem[]} items */
    setItems(items) {
        this._items = items;
        return this;
    }

    getEffectedCells() {
        return this._effectedCells;
    }

    /** @param {number} count */
    setEffectedCells(count) {
        this._effectedCells = count;
        return this;
    }

    getSheetName() {
        return this._sheetName;
    }

    /** @param {string} sheetName */
    setSheetName(sheetName) {
        this._sheetName = sheetName;
        return this;
    }

    getA1Notation() {
        return this._a1Notation;
    }

    /** @param {string} a1Notation */
    setA1Notation(a1Notation) {
        this._a1Notation = a1Notation;
        return this;
    }

    constructor() {
        // Array of ReportItem objects
        /** @type {ReportItem[]} */
        this._items = new Array();
        this._effectedCells = 0; // Number of cells affected by the report
        this._sheetName = ''; // The sheet where the range is located
        this._a1Notation = ''; // The A1 notation of the range
    }

    /** @param {ReportItem} item */
    addItem(item) {
        this._items.push(item);
        return this;
    }

    hasItems() {
        return this._items.length > 0;
    }

    static newValidationReport() {
        return new ValidationReport();
    }

    toString() {
        return JSON.stringify(this);
    }
}

class ValidationReportBuilder {
    constructor() {
        this._report = new ValidationReport();
    }

    addItem(item) {
        this._report.addItem(item);
        return this;
    }

    setEffectedCells(count) {
        this._report.setEffectedCells(count);
        return this;
    }

    setSheetName(sheetName) {
        this._report.setSheetName(sheetName);
        return this;
    }

    setA1Notation(a1Notation) {
        this._report.setA1Notation(a1Notation);
        return this;
    }

    build() {
        return this._report;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ValidationReport, ValidationReportBuilder };
}