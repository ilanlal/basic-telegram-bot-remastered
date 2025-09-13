/* eslint-disable indent */
const BaseClass = require('../../helpers/BaseClass')

class IconImage extends BaseClass {
    setIconUrl(url) {
        if (typeof url !== 'string') {
            throw new Error('Icon URL must be a string')
        }
        this._data.iconUrl = url
        return this
    }

    setAltText(altText) {
        if (typeof altText !== 'string') {
            throw new Error('Alt text must be a string')
        }
        this._data.altText = altText
        return this
    }
}

module.exports = IconImage
