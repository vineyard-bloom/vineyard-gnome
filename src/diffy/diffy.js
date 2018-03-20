"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const assert = require('assert');
let onlyFirst = [];
let onlySecond = [];
let differences = [];
let same = [];
function checkValues(obj1, obj2, originalObject1, originalObject2, rootname) {
    // let unique = [...new Set(same.map(item => item.Group))];
    // console.log(unique);
    // console.log(unique);
    for (var key in obj1) {
        if (typeof obj1[key] === 'object') {
            checkValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname);
        }
        else {
            // only first
            if (!obj2 || !obj2[key] && obj1[key]) {
                getOnlyFirstValues(obj1, obj2, originalObject1, originalObject2, key);
            }
            if (obj1 && obj2 && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                if (obj1[key] !== obj2[key]) {
                    getDifferentValues(obj1, obj2, originalObject1, originalObject2, key);
                }
                if (obj1[key] === obj2[key]) {
                    getSameValues(obj1, obj2, originalObject1, originalObject2, key);
                }
            }
        }
    }
    for (var key in obj2) {
        if (typeof obj2[key] === 'object') {
            checkValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname);
        }
        else {
            // onlySecond
            if (!obj1 || !obj1[key] && obj2[key]) {
                getOnlySecondValues(obj1, obj2, originalObject1, originalObject2, key);
            }
        }
    }
    const uniqueVal = lodash_1._.uniq(same);
    const uniqueVal2 = lodash_1._.uniq(differences);
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
    return __awaiter(this, void 0, void 0, function* () {
        const value = obj1[key];
        if (typeof value === 'function')
            return;
        onlyFirst.push({ path: originalObject1.paths()[obj1[key]], value: obj1[key] });
    });
}
exports.getOnlyFirstValues = getOnlyFirstValues;
function getOnlySecondValues(obj1, obj2, originalObject1, originalObject2, key) {
    const value = obj2[key];
    if (typeof value === 'function')
        return;
    onlySecond.push({ path: originalObject2.paths()[value], value: obj2[key] });
}
exports.getOnlySecondValues = getOnlySecondValues;
function getDifferentValues(obj1, obj2, originalObject1, originalObject2, key) {
    differences.push({ first: { path: originalObject1.paths()[obj1[key]], value: obj1[key] }, second: { path: originalObject2.paths()[obj2[key]], value: obj2[key] } });
}
exports.getDifferentValues = getDifferentValues;
function getSameValues(obj1, obj2, originalObject1, originalObject2, key) {
    same.concat({ first: { path: originalObject1.paths()[obj1[key]], value: obj1[key] }, second: { path: originalObject2.paths()[obj2[key]], value: obj2[key] } });
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