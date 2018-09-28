module.exports = class BasicPilot {

    constructor(actionList) {
        this.nextActionList = actionList || [];
    }

    hasNext() {
        return this.nextActionList.length !== 0;
    }

    next() {
        return this.nextActionList.shift();
    }

    async update(log, page) {
        return;
    }

}
