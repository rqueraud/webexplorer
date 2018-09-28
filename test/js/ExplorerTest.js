/*Copyright (c) 2017-2018 Xavier Blanc <blancxav@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

const Explorer = require('../../src/js/explorer/Explorer.js');
const BasicPilot = require('../../src/js/explorer/BasicPilot.js');
const ClickMachinePilot = require('../../src/js/explorer/ClickMachinePilot.js');
const GotoAction = require('../../src/js/action/GotoAction.js');

const assert = require('assert');

describe('Explorer', function () {
    this.timeout(40000);
	describe('with BasicPilot', function() {
		it('should open Puppeteer and goto Google and then Bing', async function() {
            let gotogoogle = new GotoAction("https://www.google.com");
            let gotobing = new GotoAction("https://www.bing.com");
            let nextActionList = [gotogoogle, gotobing];
            let basicPilot = new BasicPilot(nextActionList);

            let explorer = new Explorer(basicPilot);
            let logs = await explorer.start();
            assert(logs[0].success);
		});
    });
    
    describe('with ClickMachinePilot', function() {
		it.only('should open Puppeteer, goto LaBRI and click, click, click', async function() {
            let gotolabri = new GotoAction("https://www.labri.fr");

            let nextActionList = [gotolabri];
            let clickMachinePilot = new ClickMachinePilot(nextActionList);

            let explorer = new Explorer(clickMachinePilot);
            let logs = await explorer.start();
            assert(logs[0].success);
		});
	});
});