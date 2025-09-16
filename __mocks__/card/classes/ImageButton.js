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
const OpenLink = require('./OpenLink')

class ImageButton extends Button {
  setIconUrl(url) {
    this._data.url = url

    return this
  }

  setOpenLink(openLink) {
    if ((openLink instanceof OpenLink) === false) {
      throw new Error('Invalid value passed for "setOpenLink"')
    }

    set(this._data, 'onClick.openLink', openLink.getData())

    return this
  }
}

module.exports = ImageButton
