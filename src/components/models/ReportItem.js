/* eslint-disable no-undef */
// version: 2.0.0
class ReportItem {
  getSheetName() {
    return this._sheetName;
  }

  setSheetName(sheetName) {
    this._sheetName = sheetName;
    return this;
  }

  getA1Notation() {
    return this._a1Notation;
  }

  setA1Notation(a1Notation) {
    this._a1Notation = a1Notation;
    return this;
  }

  getMessage() {
    return this._message;
  }

  setMessage(message) {
    this._message = message;
    return this;
  }

  getStatus() {
    return this._status;
  }

  setStatus(status) {
    this._status = status;
    return this;
  }

  constructor() {
    this._a1Notation = ''; // A1 notation of the cell
    this._sheetName = ''; // Name of the sheet
    this._message = ''; // Error message, if any
    this._status = 'INVALID'; // Status of the report item
  }

  static newReportItem() {
    return new ReportItem();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ReportItem };
}