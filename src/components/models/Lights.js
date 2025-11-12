class Lights {
    static get ON() {
        return '🟢';
    }
    static get OFF() {
        return '🔘';
    }
    static get WARN() {
        return '🟡';
    }
    static get ERROR() {
        return '🔴';
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Lights };
}