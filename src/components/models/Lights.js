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

module.exports = {
    Lights
};