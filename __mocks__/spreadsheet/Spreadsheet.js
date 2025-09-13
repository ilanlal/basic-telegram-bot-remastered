const SpreadsheetStubConfiguration = require('./classes/SpreadsheetStubConfiguration')

class Spreadsheet {
  static getCurrentCell() {
    return SpreadsheetStubConfiguration.getCurrentCell()
  }

  static getSpreadsheetTimeZone() {
    return SpreadsheetStubConfiguration.getTimeZone()
  }

  static getSpreadsheetLocale() {
    return SpreadsheetStubConfiguration.getLocale()
  }

  static getActiveSheet() {
    return SpreadsheetStubConfiguration.getActiveSheet()
  }

  static getSheetByName(name) {
    return SpreadsheetStubConfiguration.getSheetByName(name)
  }

  static insertSheet(sheet) {
    return SpreadsheetStubConfiguration.insertSheet(sheet)
  }

  static setActiveSheet(sheet) {
    return SpreadsheetStubConfiguration.setActiveSheet(sheet)
  }

  static setCurrentCell(cell) {
    return SpreadsheetStubConfiguration.setCurrentCell(cell)
  }

  static setSpreadsheetTimeZone(timezone) {
    return SpreadsheetStubConfiguration.setTimeZone(timezone)
  }

  static setSpreadsheetLocale(locale) {
    return SpreadsheetStubConfiguration.setLocale(locale)
  }
}

module.exports = Spreadsheet
