const puppeteer = require('puppeteer');

module.exports = class Explorer {
    constructor() {
        this.actions = [];
        this.logs = [];
        this.index = 0;
        this.defaultOptions = {
            headless : false,
            ignoreHTTPSErrors : true,
            slowMo : 1000
        };
    }

    addAction(action) {
        this.actions.push(action);
    }

    async start() {
        this.browser = this.browser || await puppeteer.launch(this.getDefaultOptions());
        this.page = this.page || await this.browser.newPage();
        this.isStarted = false;
        await this.explore();
        return this.logs;
    }


    async stop() {
        await this.page.close();
        await this.browser.close();
    }

    getDefaultOptions() {
        return this.defaultOptions;
    }

    changeDefaultOptions(newDefaultOptions) {
        this.defaultOptions = newDefaultOptions;
    }

    changeEvaluateFunction(evaluateFunction) {

    }

    async explore() {
        while (this.index < this.actions.length) {
            await this.exploreAction(this.actions[this.index++]);
            await this.page.addScriptTag({path:'./optimal-select.js'});
        }
    }

    async exploreAction(action) {
        let log = {};
        try {
            let returns = await action.run(this.page);
            log.success = true;
            log.returns = returns;
        } catch (exception) {
            log.success = false;
            log.exception = exception;
        }
        this.logs.push(log);
    }

    
    
}