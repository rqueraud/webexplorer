const puppeteer = require('puppeteer');

module.exports = class Explorer {
    constructor(pilot) {
        this.pilot = pilot;
        this.logs = [];
        this.defaultOptions = {
            headless : false,
            ignoreHTTPSErrors : true,
            defaultViewport : {width:1024,height:768}
        };
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

    async explore() {
        while (this.pilot.hasNext()) {
            let action = this.pilot.next();
            let log = await this.exploreAction(action);
            await this.pilot.update(log, this.page);
            this.logs.push(log);
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
        return log;
    }

    
    
}