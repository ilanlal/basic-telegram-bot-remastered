const SpreadsheetStubConfiguration = require('./classes/SpreadsheetStubConfiguration')
const RangeStubConfiguration = require('./classes/RangeStubConfiguration')

const Spreadsheet = require('./Spreadsheet')

describe('Spreadsheet', () => {
  it('Should have correct default Locale', () => {
    expect(Spreadsheet.getSpreadsheetLocale()).toBe('en_US')
  })

  it('Should have correct default TimeZone', () => {
    expect(Spreadsheet.getSpreadsheetTimeZone()).toBe('America/New_York')
  })

  const locale = 'en_US'
  const tz = 'America/Los_Angeles'

  it('Should set correct Locale & TimeZone', () => {
    SpreadsheetStubConfiguration.setLocale(locale)
    SpreadsheetStubConfiguration.setTimeZone(tz)

    expect(Spreadsheet.getSpreadsheetLocale()).toBe(locale)
    expect(Spreadsheet.getSpreadsheetTimeZone()).toBe(tz)
  })

  it('Should get correct Locale & TimeZone', () => {
    Spreadsheet.setSpreadsheetLocale(locale)
    Spreadsheet.setSpreadsheetTimeZone(tz)

    expect(SpreadsheetStubConfiguration.getLocale()).toBe(locale)
    expect(SpreadsheetStubConfiguration.getTimeZone()).toBe(tz)
  })

  it('Should insert & getSheetByName', () => {
    const sheetName = 'Dummy Sheet'
    const sheet = SpreadsheetStubConfiguration.insertSheet(sheetName)
    expect(sheet.getName()).toBe(sheetName)
    expect(Spreadsheet.getSheetByName(sheetName)).toBe(sheet)
  })

  it('Should set & get ActiveSheet', () => {
    const sheet = SpreadsheetStubConfiguration.insertSheet('Dummy Sheet')
    SpreadsheetStubConfiguration.setActiveSheet(sheet)
    expect(Spreadsheet.getActiveSheet()).toBe(sheet)
  })

  it('Should set & get CurrentCell', () => {
    const cell = SpreadsheetStubConfiguration.setCurrentCell(
      RangeStubConfiguration
    )
    expect(Spreadsheet.getCurrentCell()).toBe(cell)
    expect(cell).toBeDefined()
  })

  beforeEach(() => {
    SpreadsheetStubConfiguration.reset()
  })
})
