const ClickAction = require('../action/ClickAction.js');
const BasicPilot = require('./BasicPilot.js');

module.exports = class ClickMachinePilot extends BasicPilot {
    
    async update(log, page) {
        if (! log.success) return;
        await page.addScriptTag({path:'./optimal-select.js'});
        let selectorList = await page.evaluate(scanCandidateAction);
        if (selectorList.length === 0) return;
        this.nextActionList = [new ClickAction(selectorList[getRandomInt(selectorList.length)])];
    }
}


function scanCandidateAction() {
	let selectorList = [];
	let computeCSSSelector = window['OptimalSelect'].select;
	let aElements = document.querySelectorAll('a');
	for (let i=0 ; i < aElements.length ; i++) {
		if (! isMailTo(aElements[i])) selectorList.push(computeCSSSelector(aElements[i]));
	}
	return selectorList;

	function isMailTo(element) {
		let href = element.href;
		return href && (href.toLowerCase().indexOf('mailto') > -1)
		
	}
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
//
//let nextAction = await this.page.evaluate(this.evaluateFunction);
