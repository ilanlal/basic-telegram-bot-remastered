// Obsolete
// const set = require('lodash.set')

// Simple implementation of lodash.set
const set = (obj, path, value) => {
  const keys = path.split('.')
  let current = obj
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value
    } else {
      current[key] = current[key] || {}
    }
    current = current[key]
  })
}

const AuthorizationAction = require('./AuthorizationAction')
const OpenLink = require('./OpenLink')
const Action = require('./Action')
const Widget = require('./Widget')

class Button extends Widget {
  setAuthorizationAction (action) {
    if ((action instanceof AuthorizationAction) === false) {
      throw new Error('Invalid value passed for "setAuthorizationAction"')
    }

    set(this._data, 'onClick.action', action.getData())

    return this
  }

  setOnClickAction (action) {
    if ((action instanceof Action) === false) {
      throw new Error('Invalid value passed for "setOnClickAction"')
    }

    set(this._data, 'onClick.action', action.getData())

    return this
  }

  setOpenLink (openLink) {
    if ((openLink instanceof OpenLink) === false) {
      throw new Error('Invalid value passed for "setOpenLink"')
    }

    set(this._data, 'onClick.openLink', openLink.getData())

    return this
  }
}

module.exports = Button
