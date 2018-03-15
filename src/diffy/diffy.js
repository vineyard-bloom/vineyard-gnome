"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onlyFirst = [];
const onlySecond = [];
const differences = [];
const same = [];
function checkValues(obj1, obj2) {
    let what = [];
    //Loop through properties in object 1
    for (var p in obj1) {
        //Check property exists on both objects
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
            onlyFirst.push({ path: `obj1.${p}`, value: obj1[p] });
        }
        switch (typeof (obj1[p])) {
            //Deep compare objects
            case 'object':
                if (!checkValues(obj1[p], obj2[p])) {
                    what.push({ val1: obj1[p], val2: obj2[p] });
                }
                break;
            //Compare values
            default:
                if (obj1[p] != obj2[p]) {
                    differences.push({ first: { path: `obj1.${p}`, value: obj1[p] }, second: { path: `obj2.${p}`, value: obj2[p] } });
                }
                if (obj1[p] == obj2[p]) {
                    same.push({ first: { path: `obj1.${p}`, value: obj1[p] }, second: { path: `obj2.${p}`, value: obj2[p] } });
                }
        }
    }
    //Check object 2 for any extra properties
    for (var p in obj2) {
        if (typeof (obj1[p]) == 'undefined') {
            onlySecond.push({ path: `obj2.${p}`, value: obj2[p] });
        }
    }
    return {
        differences: differences,
        same: same,
        onlyFirst: onlyFirst,
        onlySecond: onlySecond,
        what: what,
    };
}
exports.checkValues = checkValues;
;
//# sourceMappingURL=diffy.js.map