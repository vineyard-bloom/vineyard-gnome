"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('assert');
const onlyFirst = [];
const onlySecond = [];
const differences = [];
const same = [];
function checkValues(obj1, obj2, originalObject1, originalObject2) {
    for (var key in obj1) {
        if (typeof obj1[key] === 'object') {
            checkValues(obj1[key], obj2[key], originalObject1, originalObject2);
        }
        else {
            // only first
            if (!obj2 || !obj2[key]) {
                getOnlyFirstValues(obj1, obj2, originalObject1, originalObject2, key);
            }
            if (obj1 && obj2 && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                if (obj1[key] !== obj2[key])
                    getDifferentValues(obj1, obj2, originalObject1, originalObject2, key);
                if (obj1[key] == obj2[key])
                    getSameValues(obj1, obj2, originalObject1, originalObject2, key);
            }
        }
    }
    for (var key in obj2) {
        // onlySecond
        if (typeof (obj1[key]) == 'undefined' || obj2.hasOwnProperty(key) !== obj1.hasOwnProperty(key)) {
            getOnlySecondValues(obj1, obj2, originalObject2, key);
        }
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
function getOnlyFirstValues(obj1, obj2, originalObject1, originalObject2, key) {
    onlyFirst.push({ path: originalObject1.paths()[obj1[key]], value: obj1[key] });
}
exports.getOnlyFirstValues = getOnlyFirstValues;
function getOnlySecondValues(obj1, obj2, originalObject2, key) {
    onlySecond.push({ path: originalObject2.paths()[obj2[key]], value: obj2[key] });
}
exports.getOnlySecondValues = getOnlySecondValues;
function getDifferentValues(obj1, obj2, originalObject1, originalObject2, key) {
    differences.push({ first: { path: originalObject1.paths()[obj1[key]], value: obj1[key] }, second: { path: originalObject2.paths()[obj2[key]], value: obj2[key] } });
}
exports.getDifferentValues = getDifferentValues;
function getSameValues(obj1, obj2, originalObject1, originalObject2, key) {
    same.push({ first: { path: originalObject1.paths()[obj1[key]], value: obj1[key] }, second: { path: originalObject2.paths()[obj2[key]], value: obj2[key] } });
}
exports.getSameValues = getSameValues;
Object.prototype.paths = function (root = [], result = {}) {
    var ok = Object.keys(this);
    return ok.reduce((res, key) => {
        var path = root.concat(key);
        typeof this[key] === "object" &&
            this[key] !== null ? this[key].paths(path, res)
            : res[this[key]] == 0 || res[this[key]] ? res[this[key]].push(path)
                : res[this[key]] = [path];
        return res;
    }, result);
};
//# sourceMappingURL=diffy.js.map