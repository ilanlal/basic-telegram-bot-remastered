/* eslint-disable indent */
const BaseClass = require('../../helpers/BaseClass')
const Action = require('./Action')
/**
 * @see https://developers.google.com/apps-script/reference/card-service/switch
 */
class Switch extends BaseClass {
    setOnChangeAction(action) {
        if ((action instanceof Action) === false) {
            throw new Error('OnChange action must be an instance of Action')
        }
        this._data.onChangeAction = action.getData()
        return this
    }

    setSelector(selector) {
        if (typeof selector !== 'string') {
            throw new Error('Selector must be a string')
        }
        this._data.selector = selector
        return this
    }

    setFriendlyName(name) {
        if (typeof name !== 'string') {
            throw new Error('Friendly name must be a string')
        }
        this._data.friendlyName = name
        return this
    }

    setValue(value) {
        if (typeof value !== 'boolean') {
            throw new Error('Value must be a boolean')
        }
        this._data.value = value
        return this
    }
}

module.exports = Switch
