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
    for (var key in obj1) {
        if (typeof obj1[key] === 'object') {
            checkValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname);
        }
        else {
            if (!obj2 || !obj2[key] && obj1[key]) {
                getOnlyFirstValues(obj1, obj2, originalObject1, originalObject2, key, rootname);
            }
            if (obj1 && obj2 && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                if (obj1[key] !== obj2[key]) {
                    getDifferentValues(obj1, obj2, originalObject1, originalObject2, key, rootname);
                }
                const aval = obj1[key];
                const aval2 = obj2[key];
                if (obj1[key] === obj2[key]) {
                    getSameValues(obj1, obj2, originalObject1, originalObject2, key, rootname);
                }
            }
        }
    }
    for (var key in obj2) {
        if (typeof obj2[key] === 'object') {
            checkValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname);
        }
        else {
            if (!obj1 || !obj1[key] && obj2[key]) {
                getOnlySecondValues(obj1, obj2, originalObject1, originalObject2, key, rootname);
            }
        }
    }
    return {
        differences: uniqueFirstAndSecond(differences),
        same: uniqueFirstAndSecond(same),
        onlyFirst: unique(onlyFirst),
        onlySecond: unique(onlySecond),
    };
}
exports.checkValues = checkValues;
;
function getOnlyFirstValues(obj1, obj2, originalObject1, originalObject2, key, rootname) {
    return __awaiter(this, void 0, void 0, function* () {
        const value = obj1[key];
        if (typeof value === 'function')
            return;
        let path1 = originalObject1.paths()[obj1[key]];
        path1[0].unshift(rootname);
        onlyFirst.push({ path: path1, value: value });
    });
}
exports.getOnlyFirstValues = getOnlyFirstValues;
function getOnlySecondValues(obj1, obj2, originalObject1, originalObject2, key, rootname) {
    const value = obj2[key];
    if (typeof value === 'function')
        return;
    let path2 = originalObject2.paths()[obj2[key]];
    path2[0].unshift(rootname);
    onlySecond.push({ path: path2, value: value });
}
exports.getOnlySecondValues = getOnlySecondValues;
function getDifferentValues(obj1, obj2, originalObject1, originalObject2, key, rootname) {
    let path1 = originalObject1.paths()[obj1[key]];
    path1[0].unshift(rootname);
    let path2 = originalObject2.paths()[obj2[key]];
    path2[0].unshift(rootname);
    differences.push({ first: { path: path1, value: obj1[key] }, second: { path: path2, value: obj2[key] } });
}
exports.getDifferentValues = getDifferentValues;
function getSameValues(obj1, obj2, originalObject1, originalObject2, key, rootname) {
    let path1 = originalObject1.paths()[obj1[key]];
    path1[0].unshift(rootname);
    let path2 = originalObject2.paths()[obj2[key]];
    path2[0].unshift(rootname);
    same.push({ first: { path: path1, value: obj1[key] }, second: { path: path2, value: obj2[key] } });
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
function uniqueFirstAndSecond(arr) {
    var uniques = lodash_1._.map(lodash_1._.groupBy(arr, function (item) {
        return item.first.value;
    }), function (grouped) {
        return grouped[0];
    });
    return uniques;
}
exports.uniqueFirstAndSecond = uniqueFirstAndSecond;
function unique(arr) {
    var uniques = lodash_1._.map(lodash_1._.groupBy(arr, function (item) {
        return item.value;
    }), function (grouped) {
        return grouped[0];
    });
    return uniques;
}
exports.unique = unique;
//# sourceMappingURL=diffy.js.map