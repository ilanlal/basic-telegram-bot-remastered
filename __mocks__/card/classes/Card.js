const CardHeader = require('./CardHeader')
const CardSection = require('./CardSection')
const CardAction = require('./CardAction')
const FixedFooter = require('./FixedFooter')
const BaseClass = require('../../helpers/BaseClass')

class Card extends BaseClass {
  constructor() {
    super()
    this._data.sections = []
    this._data.cardActions = []
  }

  setName(name) {
    // TODO: check the name of the property
    this._data.name = name

    return this
  }

  setHeader(header) {
    if ((header instanceof CardHeader) === false) {
      throw new Error('Invalid value passed for "setHeader"')
    }

    this._data.header = header.getData()

    return this
  }

  addSection(section) {
    if ((section instanceof CardSection) === false) {
      throw new Error('Invalid value passed for "addSection"')
    }

    this._data.sections.push(section.getData())

    return this
  }

  addCardAction(cardAction) {
    if ((cardAction instanceof CardAction) === false) {
      throw new Error('Invalid value passed for "addCardAction"')
    }

    this._data.cardActions.push(cardAction.getData())

    return this
  }

  setFixedFooter(fixedFooter) {
    if ((fixedFooter instanceof FixedFooter) === false) {
      throw new Error('Invalid value passed for "setFixedFooter"')
    }

    this._data.fixedFooter = fixedFooter.getData()

    return this
  }

  printJson() {
    return this.getData()
  }
}

module.exports = Card
