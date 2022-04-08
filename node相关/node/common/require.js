/*
 * @Author: your name
 * @Date: 2021-08-05 15:59:15
 * @LastEditTime: 2021-08-05 16:04:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \正式d:\学习文件夹\jsBoost\node\common\require.js
 */

const vm = require('vm');
const path = require('path');
const fs = require('fs');

function r(filename) {
    const pathToFile = path.resolve(__dirname, filename);
    const content = fs.readFileSync(pathToFile, 'utf-8');

    const wrapperContent = `(function(require,module,exports){
    ${content}
})` 
    const script = new vm.Script(wrapperContent, {
        filename
    })
    const module = {
        exports: {}
    }
    const results = script.runInThisContext();
    results(r, module, module.exports)
    return module.exports
}
global.r = r;