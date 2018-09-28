function scanCandidateAction() {
	let actions = [];
	let computeCSSSelector = window['OptimalSelect'].select;
	let aElements = document.querySelectorAll('a');
	for (let i=0 ; i < aElements.length ; i++) {
		if (! isMailTo(aElements[i])) actions.push(computeCSSSelector(aElements[i]));
	}
	return actions;

	function isMailTo(element) {
		let href = element.href;
		return href && (href.toLowerCase().indexOf('mailto') > -1)
		
	}
}