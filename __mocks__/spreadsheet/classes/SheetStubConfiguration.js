/* eslint-disable indent */
const RangeStubConfiguration = require('./RangeStubConfiguration')
const SpreadsheetStubConfiguration = require('./SpreadsheetStubConfiguration')

class SheetStubConfiguration {
    constructor() {
        this._name = 'Sheet1'
        this._parent = SpreadsheetStubConfiguration
        this._range = RangeStubConfiguration
        this._activeCell = RangeStubConfiguration
        /** @type {RangeStubConfiguration | null} */
        this._currentCell = null
        /** @type {RangeStubConfiguration | null} */
        this._selection = null
    }

    appendRow(rowContents) {
        return this._range.setValues([...this._range.getValues(), rowContents])
    }

    clear() {
        this._range = RangeStubConfiguration
    }

    getActiveCell() {
        return this._activeCell
    }

    getActiveRange() {
        return this._selection
    }

    getCurrentCell() {
        return this._currentCell
    }

    getDataRange() {
        return this._range
    }

    getLastColumn() {
        return this._range.getLastColumn()
    }

    getLastRow() {
        return this._range.getLastRow()
    }

    getName() {
        return this._name
    }

    getParent() {
        return this._parent
    }

    getRange(a1Notation) {
        this._range = RangeStubConfiguration.setA1Notation(a1Notation)
        return this._range
    }

    getSelection() {
        return this._selection
    }

    getSheetName() {
        return this._name
    }

    setActiveRange(range = RangeStubConfiguration) {
        this._selection = range
        return this._selection
    }

    setActiveSelection(selection = null) {
        // if selection is string
        if (typeof selection === 'string') {
            this._selection = RangeStubConfiguration.setA1Notation(selection)
        } else {
            this._selection = selection
        }
        return this._selection
    }

    setCurrentCell(cell = null) {
        this._currentCell = cell
        return this._currentCell
    }

    setName(name) {
        this._name = name
        return this
    }

    reset() {
        this._name = 'Sheet1'
        this._parent = SpreadsheetStubConfiguration
        this._range = RangeStubConfiguration
        this._activeCell = RangeStubConfiguration
        this._currentCell = null
        this._selection = null
        RangeStubConfiguration.reset()
    }
}

module.exports = new SheetStubConfiguration()
