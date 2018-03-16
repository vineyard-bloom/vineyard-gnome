"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onlyFirst = [];
const onlySecond = [];
const differences = [];
const same = [];
function checkValues(obj1, obj2, rootName) {
    for (var key in obj1) {
        if (typeof obj1[key] === 'object') {
            checkValues(obj1[key], obj2[key], rootName);
            break;
        }
        // const diffs = getDifferentValues(obj1[key], obj2[key], key, rootName, [rootName]);
        const firstVal = getOnlyFirstValues(obj1, obj2, key, rootName, [rootName]);
        if (!firstVal)
            break;
        getSameValues(obj1[key], obj2[key], key, rootName, [rootName]);
        // if ('object' && obj2 == undefined || obj1.hasOwnProperty(key) !== obj2.hasOwnProperty(key)) {
        //   onlyFirst.push({ path: `${rootName}.${key}`, value: obj1[key] })
        //   break;
        // }
        // if (obj1[key] != obj2[key]) {
        //   differences.push({ first: { path: `${rootName}.${key}`, value: obj1[key] }, second: { path: `${rootName}.${key}`, value: obj2[key] } })
        // }
        // if (obj1[key] == obj2[key]) {
        //   same.push({ first: { path: `${rootName}.${key}`, value: obj1[key] }, second: { path: `${rootName}.${key}`, value: obj2[key] } })
        // }
    }
    for (var key in obj2) {
        getOnlySecondValues(obj1, obj2, key, rootName, [rootName]);
    }
    return {
        differences: differences,
        same: same,
        onlyFirst: onlyFirst,
        onlySecond: onlySecond,
    };
}
exports.checkValues = checkValues;
;
function getOnlyFirstValues(obj1, obj2, key, rootName, path) {
    // if (obj2 && obj1) getDifferentValues(obj1, obj2, key, rootName, path);
    if ('object' && obj2 == undefined || obj1.hasOwnProperty(key) !== obj2.hasOwnProperty(key)) {
        onlyFirst.push({ path: `${rootName}.${key}`, value: obj1[key] });
        return false;
    }
    else {
        return true;
    }
}
exports.getOnlyFirstValues = getOnlyFirstValues;
function getOnlySecondValues(obj1, obj2, key, rootName, path) {
    if (typeof (obj1[key]) == 'undefined') {
        onlySecond.push({ path: `${rootName}.${key}`, value: obj2[key] });
    }
}
exports.getOnlySecondValues = getOnlySecondValues;
function getDifferentValues(obj1, obj2, key, rootName, path) {
    if (!obj1 || !obj2)
        return false;
    if (obj1 != obj2) {
        differences.push({ first: { path: `${rootName}.${key}`, value: obj1[key] }, second: { path: `${rootName}.${key}`, value: obj2[key] } });
    }
}
exports.getDifferentValues = getDifferentValues;
function getSameValues(obj1, obj2, key, rootName, path) {
    if (obj1[key] == obj2[key]) {
        same.push({ first: { path: `${rootName}.${key}`, value: obj1[key] }, second: { path: `${rootName}.${key}`, value: obj2[key] } });
    }
}
exports.getSameValues = getSameValues;
//# sourceMappingURL=diffy.js.map