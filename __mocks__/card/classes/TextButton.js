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
const Button = require('./Button')
const AuthorizationAction = require('./AuthorizationAction')

class TextButton extends Button {
  setAuthorizationAction(action) {
    if ((action instanceof AuthorizationAction) === false) {
      throw new Error('Invalid value passed for "setAuthorizationAction"')
    }

    set(this._data, 'onClick.openLink', action.getData())

    return this
  }

  setText(text) {
    this._data.text = text
    return this
  }

  setTextButtonStyle(style) {
    this._data.style = style
    return this
  }

  setDisabled(disabled) {
    this._data.disabled = disabled
    return this
  }

  getData() {
    return { textButton: super.getData() }
  }
}

module.exports = TextButton
