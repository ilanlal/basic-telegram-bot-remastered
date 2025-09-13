/* eslint-disable indent */
const SheetStubConfiguration = require('./SheetStubConfiguration')

class RangeStubConfiguration {
    constructor() {
        this._sheet = SheetStubConfiguration
        this._a1Notation = 'A1'
        this._values = [[]]
    }

    activate() {
        this._sheet.setActiveRange(this)
    }

    getA1Notation() {
        return this._a1Notation
    }

    getCell(row, column) {
        return new RangeStubConfiguration()
            .setA1Notation(`${String.fromCharCode(65 + column)}${row + 1}`)
            .setValue(this._values[row][column])
    }

    getHorizontalAlignment() {
        return this._horizontalAlignment
    }

    getLastColumn() {
        return this._values[0].length
    }

    getLastRow() {
        return this._values.length
    }

    getSheet() {
        return this._sheet
    }

    getValue() {
        return this._values[0][0]
    }

    getValues() {
        return this._values
    }

    getVerticalAlignment() {
        return this._verticalAlignment
    }

    setA1Notation(a1Notation) {
        this._a1Notation = a1Notation
        return this
    }

    setHorizontalAlignment(value) {
        this._horizontalAlignment = value
    }

    setVerticalAlignment(value) {
        this._verticalAlignment = value
    }

    setValue(value) {
        this._values[0][0] = value
    }

    setValues(values) {
        this._values = [...values]
    }

    reset() {
        this._sheet = SheetStubConfiguration
        this._a1Notation = 'A1'
        this._values = [[]]
    }
}

module.exports = new RangeStubConfiguration()
