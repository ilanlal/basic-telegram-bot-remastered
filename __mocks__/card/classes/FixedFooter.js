/* eslint-disable indent */

const BaseClass = require('../../helpers/BaseClass')
const TextButton = require('./TextButton')

class FixedFooter extends BaseClass {
    constructor() {
        super()
        this._data.primaryButton = null
        this._data.secondaryButton = null
    }

    setPrimaryButton(button) {
        if ((button instanceof TextButton) === false) {
            throw new Error('Invalid button')
        }
        this._data.primaryButton = button
        return this
    }

    setSecondaryButton(button) {
        if ((button instanceof TextButton) === false) {
            throw new Error('Invalid button')
        }
        this._data.secondaryButton = button
        return this
    }
}

module.exports = FixedFooter
