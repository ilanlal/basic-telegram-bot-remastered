const ButtonSet = require('./ButtonSet')
const Button = require('./Button')

describe('ButtonSet', () => {
  it('Should add the button', () => {
    const data = new ButtonSet()
      .addButton(new Button())
      .addButton(new Button())
      .getData()

    expect(data).toEqual({ buttons: [{}, {}] })
  })
})
