const FixedFooter = require('./FixedFooter')
const TextButton = require('./TextButton')

describe('FixedFooter', () => {
  let fixedFooter

  beforeEach(() => {
    fixedFooter = new FixedFooter()
  })

  it('should set primary button', () => {
    const button = new TextButton()
    fixedFooter.setPrimaryButton(button)
    expect(fixedFooter.getData().primaryButton.getData()).toEqual(button.getData())
  })

  it('should set secondary button', () => {
    const button = new TextButton()
    fixedFooter.setSecondaryButton(button)
    expect(fixedFooter.getData().secondaryButton.getData()).toEqual(button.getData())
  })

  it('should throw error for invalid primary button', () => {
    expect(() => fixedFooter.setPrimaryButton({})).toThrow('Invalid button')
  })

  it('should throw error for invalid secondary button', () => {
    expect(() => fixedFooter.setSecondaryButton({})).toThrow('Invalid button')
  })
})
