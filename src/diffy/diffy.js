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
function checkValues(obj1, obj2, originalObject1, originalObject2, rootname, onlyFirst, onlySecond, differences, same) {
    for (var key in obj1) {
        if (typeof obj1[key] === 'object') {
            checkValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname, onlyFirst, onlySecond, differences, same);
        }
        else {
            const val1 = obj1[key];
            const path1 = originalObject1.paths()[obj1[key]];
            if (!obj2 || !obj2[key] && val1) {
                getOnlyFirstValues(val1, path1, rootname, onlyFirst);
            }
            if (obj1 && obj2 && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                const val2 = obj2[key];
                const path2 = originalObject2.paths()[val2];
                if (val1 !== val2) {
                    getDifferentValues(val1, val2, path1, path2, rootname, differences);
                }
                if (val1 === val2) {
                    getSameValues(val1, val2, path1, path2, rootname, same);
                }
            }
        }
    }
    for (var key in obj2) {
        if (typeof obj2[key] === 'object') {
            checkValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname, onlyFirst, onlySecond, differences, same);
        }
        else {
            const val2 = obj2[key];
            const path2 = originalObject2.paths()[obj2[key]];
            if (!obj1 || !obj1[key] && val2) {
                getOnlySecondValues(val2, path2, rootname, onlySecond);
            }
        }
    }
    const objToReturn = {
        differences: uniqueFirstAndSecond(differences),
        same: uniqueFirstAndSecond(same),
        onlyFirst: unique(onlyFirst),
        onlySecond: unique(onlySecond),
    };
    return objToReturn;
}
exports.checkValues = checkValues;
;
function getOnlyFirstValues(value, path, rootname, onlyFirst) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof value === 'function')
            return;
        path[0].unshift(rootname);
        onlyFirst.push({ path: path, value: value });
    });
}
exports.getOnlyFirstValues = getOnlyFirstValues;
function getOnlySecondValues(value, path, rootname, onlySecond) {
    if (typeof value === 'function')
        return;
    path[0].unshift(rootname);
    onlySecond.push({ path: path, value: value });
}
exports.getOnlySecondValues = getOnlySecondValues;
function getDifferentValues(val1, val2, path1, path2, rootname, differences) {
    path1[0].unshift(rootname);
    path2[0].unshift(rootname);
    differences.push({ first: { path: path1, value: val1 }, second: { path: path2, value: val2 } });
}
exports.getDifferentValues = getDifferentValues;
function getSameValues(val1, val2, path1, path2, rootname, same) {
    path1[0].unshift(rootname);
    path2[0].unshift(rootname);
    same.push({ first: { path: path1, value: val1 }, second: { path: path2, value: val2 } });
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