const SheetStubConfiguration = require('./SheetStubConfiguration')

class SpreadsheetStubConfiguration {
  constructor() {
    this.init()
    this._sheets = [SheetStubConfiguration]
    this._activeSheet = this._sheets.at(0)
  }

  init() {
    this._timezone = 'America/New_York'
    this._locale = 'en_US'
  }

  getActiveSheet() {
    return this._activeSheet
  }

  getCurrentCell() {
    return this._activeSheet.getCurrentCell()
  }

  getLocale() {
    return this._locale
  }

  getSheetByName(name) {
    return this._sheets.find(sheet => sheet.getName() === name)
  }

  getTimeZone() {
    return this._timezone
  }

  insertSheet(sheetName) {
    this._sheets.push(SheetStubConfiguration.setName(sheetName))
    return this._sheets.at(-1)
  }

  /** @returns SheetStubConfiguration */
  setActiveSheet(sheet) {
    this._activeSheet = sheet
    return this._activeSheet
  }

  setCurrentCell(cell) {
    this._activeSheet.setCurrentCell(cell)
    return this._activeSheet.getCurrentCell()
  }

  setLocale(locale) {
    this._locale = locale
  }

  setTimeZone(timezone) {
    this._timezone = timezone
  }

  reset() {
    this.init()
    this._sheets = [SheetStubConfiguration]
    this._activeSheet = this._sheets.at(0)
    SheetStubConfiguration.reset()
  }
}

module.exports = new SpreadsheetStubConfiguration()
