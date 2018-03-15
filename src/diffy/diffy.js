"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deepEql = require("deep-eql");
//SingleTransaction
const onlyFirst = [];
const onlySecond = [];
const differences = [];
const same = [];
function deepEqual(first, second) {
    return deepEql(first, second);
}
exports.deepEqual = deepEqual;
function compare(first, second, path, secondName) {
    for (let i in first) {
        const firstValue = first[i];
        const secondValue = second ? second[i] : undefined;
        if (firstValue && typeof firstValue === 'object') {
            compare(firstValue, secondValue, path.concat(i), secondName);
            // messages = messages.concat(compare(firstValue, secondValue, path.concat(i), secondName))
        }
        if (secondValue === undefined) {
            onlyFirst.push({ path: `first.${i}`, value: first[i] });
            const pathString = path.concat(i).join('.');
            // messages.push(secondName + ' is missing ' + pathString)
        }
        if (secondValue && secondValue !== first[i]) {
            console.log('%c ( ͡° ͜ʖ ͡°)', 'color:tomato;font-size:30px;', first[i], secondValue);
            differences.push({ first: { path: `first.${i}`, value: first[i] }, second: { path: `second.${i}`, value: second[i] } });
            // if (first[i] && typeof first[i] === 'object') {
            //  compare(first[i], secondValue, path.concat(i), secondName)
            //  // messages = messages.concat(compare(firstValue, secondValue, path.concat(i), secondName))
            // }
            // else {
            // }
        }
        if (secondValue === first[i]) {
            same.push({ first: { path: `first.${i}`, value: first[i] }, second: { path: `second.${i}`, value: second[i] } });
        }
    }
    for (let i in second) {
        const firstValue = first ? first[i] : undefined;
        const secondValue = second[i];
        if (secondValue && typeof secondValue === 'object') {
            return compare(firstValue, secondValue, path.concat(i), secondName);
        }
        if (firstValue === undefined) {
            onlySecond.push({ path: `second.${i}`, value: second[i] });
            const pathString = path.concat(i).join('.');
            // messages.push(secondName + ' is missing ' + pathString)
        }
    }
    return {
        differences: differences,
        same: same,
        onlyFirst: onlyFirst,
        onlySecond: onlySecond,
    };
}
exports.compare = compare;
//How To Compare Object Values
var a = { blah: 1 };
var b = { blah: 1 };
var c = a;
var d = { blah: 2 };
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
// console.log(Object.compare(a, b));  //true
// console.log(Object.compare(a, c));  //true
// console.log(Object.compare(a, d));  //false
//# sourceMappingURL=diffy.js.map