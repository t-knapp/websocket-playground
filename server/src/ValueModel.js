class ValueModel {
    constructor() {
        this.value = 0;
    }

    onIncrementMessage(message) {
        this.value += 1;
        return { 'ValueVal': this.value }
    }

    onDecrementMessage(message) {
        this.value -= 1;
        return { 'ValueVal': this.value }
    }
}

module.exports = ValueModel;