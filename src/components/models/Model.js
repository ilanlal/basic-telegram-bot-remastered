class Model {
    constructor(data = {}) {
        this._data = data;
    }

    getData() {
        return this._data;
    }

    setData(data) {
        this._data = data;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Model
    };
}