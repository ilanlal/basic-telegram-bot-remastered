const Card = require('./Card')
const CardHeader = require('./CardHeader')
const CardSection = require('./CardSection')
const CardAction = require('./CardAction')
const FixedFooter = require('./FixedFooter')

describe('Card', () => {
  it('Should set the name', () => {
    const card = new Card().setName('card-name')

    expect(card.printJson()).toEqual({
      cardActions: [],
      sections: [],
      name: 'card-name',
    })
  })

  it('Should set the header', () => {
    const card = new Card().setHeader(new CardHeader())

    expect(card.printJson()).toEqual({
      cardActions: [],
      sections: [],
      header: {},
    })
  })

  it('Should throw an exception on set the header', () => {
    expect(new Card().setHeader)
      .toThrowError('Invalid value passed for "setHeader"')
  })

  it('Should set the section', () => {
    const card = new Card()
      .addSection(new CardSection())
      .addSection(new CardSection())

    expect(card.printJson()).toEqual({
      cardActions: [],
      sections: [
        { widgets: [] },
        { widgets: [] },
      ]
    })
  })

  it('Should throw an exception on set the section', () => {
    expect(new Card().addSection)
      .toThrowError('Invalid value passed for "addSection"')
  })

  it('Should set the card action', () => {
    const card = new Card()
      .addCardAction(new CardAction())
      .addCardAction(new CardAction())

    expect(card.printJson()).toEqual({
      cardActions: [{}, {}],
      sections: [],
    })
  })

  it('Should set the fixed footer', () => {
    const card = new Card().setFixedFooter(new FixedFooter())

    expect(card.printJson()).toEqual({
      cardActions: [],
      sections: [],
      fixedFooter: {
        primaryButton: null,
        secondaryButton: null
      },
    })
  })

  it('Should throw an exception on set the fixed footer', () => {
    expect(new Card().setFixedFooter)
      .toThrowError('Invalid value passed for "setFixedFooter"')
  })
})
