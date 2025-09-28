class Reply {
    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
    }

    get reply() {
        return this._reply;
    }

    set reply(value) {
        this._reply = value;
    }

    constructor() {
        this._key = '';
        this._reply = null;
    }

    static create() {
        return new Reply();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Reply
    };
}