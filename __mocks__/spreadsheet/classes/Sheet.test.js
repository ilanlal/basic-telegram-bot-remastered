const SheetStubConfiguration = require('./SheetStubConfiguration')
const RangeStubConfiguration = require('./RangeStubConfiguration')

describe('Sheet', () => {
  beforeEach(() => {
    SheetStubConfiguration.reset()
  })

  it('Should get the name of the sheet', () => {
    const sheet = SheetStubConfiguration.getName()
    expect(sheet).toBe('Sheet1')
  })

  it('Should get the range of the sheet', () => {
    const range = SheetStubConfiguration.getRange('A1:B2')
    expect(range).toBeDefined()
    expect(range.getA1Notation()).toBe('A1:B2')
  })

  it('Should set & get ActiveRange', () => {
    const range = SheetStubConfiguration.getRange('A1:B2')
    SheetStubConfiguration.setActiveRange(range)
    expect(SheetStubConfiguration.getActiveRange()).toBe(range)
  })

  it('Should set & get CurrentCell', () => {
    const cell = SheetStubConfiguration.setCurrentCell(
      RangeStubConfiguration.setA1Notation('B2')
    )
    expect(SheetStubConfiguration.getCurrentCell()).toBe(cell)
  })
})
