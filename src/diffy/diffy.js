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
/**
 * checkValues
 *
 * @param {obj1} a REQUIRED object to check
 * @param {obj2} a REQUIRED object to compare obj1 against
 * @param {originalObject1} an OPTIONAL object for maintaining original object
 * @param {originalObject2} an OPTIONAL object for maintaining original comparison object
 * @param {rootname} an OPTIONAL string defining the root objects name
 * @param {onlyFirst} an OPTIONAL array for the keys only in the first object
 * @param {onlySecond} an OPTIONAL array for the keys only in the second object
 * @param {differences} an OPTIONAL array for the keys in both objects but with different values
 * @param {same} an OPTIONAL array for the keys that have the same values in both objects
 * @returns AddressResponse which is an object of the previously defined arrays
 */
function checkValues(obj1, obj2, originalObject1 = obj1, originalObject2 = obj2, rootname = 'objectRoot', onlyFirst = [], onlySecond = [], differences = [], same = []) {
    // passible HACK. had to move in here to get village running
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
    for (var key in obj1) {
        if (typeof obj1[key] === 'object') {
            checkValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname, onlyFirst, onlySecond, differences, same);
        }
        else {
            const val1 = obj1[key];
            const path1 = originalObject1.paths()[val1];
            if (!obj2 || !obj2[key] && val1) {
                // only first
                onlyValues(val1, path1, rootname, onlyFirst);
            }
            if (obj1 && obj2 && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                let val2 = obj2[key];
                if (typeof val2 === 'object') {
                    if (typeof val2.getDate === 'function') {
                        val2 = val2.toString();
                        obj2[key] = val2;
                    }
                    else {
                        val2 = val2.toNumber();
                        obj2[key] = val2;
                    }
                    console.log('maybve');
                }
                const path2 = originalObject2.paths()[val2];
                if (val1.toString() !== val2.toString()) {
                    // different values
                    bothValues(val1, val2, path1, path2, rootname, differences);
                }
                if (val1.toString() == val2.toString() && path1 && path2) {
                    // same values
                    bothValues(val1, val2, path1, path2, rootname, same);
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
            const path2 = originalObject2.paths()[val2];
            if (!obj1 || !obj1[key] && val2) {
                // only second
                onlyValues(val2, path2, rootname, onlySecond);
            }
        }
    }
    return {
        differences: unique(differences, true),
        same: unique(same, true),
        onlyFirst: unique(onlyFirst),
        onlySecond: unique(onlySecond),
    };
}
exports.checkValues = checkValues;
;
function onlyValues(value, path, rootname, arr) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof value === 'function')
            return;
        path[0].unshift(rootname);
        arr.push({ path: path, value: value });
    });
}
exports.onlyValues = onlyValues;
function bothValues(val1, val2, path1, path2, rootname, arr) {
    if (typeof value === 'function')
        return;
    path1[0].unshift(rootname);
    path2[0].unshift(rootname);
    arr.push({ first: { path: path1, value: val1 }, second: { path: path2, value: val2 } });
}
exports.bothValues = bothValues;
function unique(arr, isMultiple = false) {
    var uniques = lodash_1._.map(lodash_1._.groupBy(arr, function (item) {
        return isMultiple ? item.first.value : item.value;
    }), function (grouped) {
        return grouped[0];
    });
    return uniques;
}
exports.unique = unique;
//# sourceMappingURL=diffy.js.map