/* eslint-disable indent */
const Widget = require('./Widget')
const Action = require('./Action')
const Button = require('./Button')
const Switch = require('./Switch')
const IconImage = require('./IconImage')
/**
 * @see https://developers.google.com/apps-script/reference/card-service/decorated-text
 */
class DecoratedText extends Widget {
    constructor() {
        super()
        this._data.text = ''
    }

    setAuthorizationAction(action) {
        if ((action instanceof Action) === false) {
            throw new Error('Authorization action must be an instance of Action')
        }
        this._data.authorizationAction = action.getData()
        return this
    }

    setBottomLabel(text) {
        if (typeof text !== 'string') {
            throw new Error('Bottom label must be a string')
        }
        this._data.bottomLabel = text
        return this
    }

    setButton(button) {
        if (!(button instanceof Button)) {
            throw new Error('Button must be an instance of Button')
        }
        this._data.button = button.getData()
        return this
    }

    setComposeAction(action, composedEmailType) {
        if ((action instanceof Action) === false) {
            throw new Error('Compose action must be an instance of Action')
        }
        this._data.composeAction = action.getData()
        this._data.composedEmailType = composedEmailType
        return this
    }

    setEndIcon(endIcon) {
        if (!(endIcon instanceof IconImage)) {
            throw new Error('End icon must be an instance of IconImage')
        }
        this._data.endIcon = endIcon.getData()
        return this
    }

    setOnClickAction(action) {
        if ((action instanceof Action) === false) {
            throw new Error('OnClick action must be an instance of Action')
        }
        this._data.onClickAction = action.getData()
        return this
    }

    setOnClickOpenLinkAction(action) {
        if ((action instanceof Action) === false) {
            throw new Error('OnClickOpenLink action must be an instance of Action')
        }
        this._data.onClickOpenLinkAction = action.getData()
        return this
    }

    setOpenLink(openLink) {
        if (typeof openLink !== 'string') {
            throw new Error('Open link must be a string')
        }
        this._data.openLink = openLink
        return this
    }

    setStartIcon(startIcon) {
        if (!(startIcon instanceof IconImage)) {
            throw new Error('Start icon must be an instance of IconImage')
        }
        this._data.startIcon = startIcon.getData()
        return this
    }

    setSwitchControl(switchToSet) {
        if (!(switchToSet instanceof Switch)) {
            throw new Error('Switch control must be an instance of Switch')
        }
        this._data.switchControl = switchToSet.getData()
        return this
    }

    setText(text) {
        if (typeof text !== 'string') {
            throw new Error('Text must be a string')
        }
        this._data.text = text
        return this
    }

    setTopLabel(text) {
        if (typeof text !== 'string') {
            throw new Error('Top label must be a string')
        }
        this._data.topLabel = text
        return this
    }

    setWrapText(wrapText) {
        this._data.wrapText = wrapText
        return this
    }
}

module.exports = DecoratedText
