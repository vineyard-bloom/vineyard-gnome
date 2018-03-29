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
 * @param {obj1: object} a RE: objectQUIRED object to check
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
function checkValues2(obj1, obj2, originalObject1 = obj1, originalObject2 = obj2, rootname = 'objectRoot', onlyFirst = [], onlySecond = [], differences = [], same = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstOnlyValues = getOnlyFirstValues(obj1, obj2);
        const secondOnlyValues = yield getOnlySecondValues(obj1, obj2, originalObject2, rootname);
        const differentValues = getDifferentValues(obj1, obj2);
        const sameValues = getSameValues(obj1, obj2);
        // return {
        //  onlyfirst: firstOnlyValues,
        //  onylSecond: secondOnlyValues,
        //  differences: differentValues,
        //  sameValues: sameValues,
        // }
        return {
            onylSecond: secondOnlyValues,
        };
    });
}
exports.checkValues2 = checkValues2;
;
function getOnlyFirstValues(obj1, obj2) {
}
exports.getOnlyFirstValues = getOnlyFirstValues;
function getOnlySecondValues(obj1, obj2, originalObject2, rootname, onlySecondValues = []) {
    for (var key in obj2) {
        const value = obj2[key];
        const path = originalObject2.paths()[value];
        if (typeof obj2[key] === 'object') {
            getOnlySecondValues(obj1[key], obj2[key], originalObject2, rootname, onlySecondValues);
        }
        else {
            let value = obj2[key];
            const path2 = originalObject2.paths()[value];
            if (typeof value === 'function')
                value = null;
            if (value !== null && !obj1 || !obj1[key]) {
                // only second
                // onlyValues(val2, path2, rootname, onlySecond);
                onlySecondValues.push({ path: path, value: value });
            }
        }
    }
    return onlySecondValues;
}
exports.getOnlySecondValues = getOnlySecondValues;
function getDifferentValues(obj1, obj2) {
}
exports.getDifferentValues = getDifferentValues;
function getSameValues(obj1, obj2) {
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
function unique(arr, isMultiple = false) {
    var uniques = lodash_1._.map(lodash_1._.groupBy(arr, function (item) {
        return isMultiple ? item.first.value : item.value;
    }), function (grouped) {
        return grouped[0];
    });
    return uniques;
}
exports.unique = unique;
//# sourceMappingURL=diffy.2.js.map