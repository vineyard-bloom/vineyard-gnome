import { blockchain } from 'vineyard-blockchain';
import { AddressHistory, EthereumTransaction, TokenTransferRecord, Address, AddressResponse } from "../types"
import { log } from 'util';
import { _ } from 'lodash';

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

export async function checkValues2(obj1: object, obj2: object, originalObject1 = obj1, originalObject2 = obj2, rootname = 'objectRoot', onlyFirst = [], onlySecond = [], differences = [], same = []): any {
  const firstOnlyValues = getOnlyFirstValues(obj1, obj2, originalObject1, rootname);
  const secondOnlyValues = await getOnlySecondValues(obj1, obj2, originalObject2, rootname);
  const differentValues = getDifferentValues(obj1, obj2, originalObject1, originalObject2, rootname);
  const sameValues = getSameValues(obj1, obj2, originalObject1, originalObject2, rootname);

  return {
    onylSecond: secondOnlyValues,
    onylFirst: firstOnlyValues,
    differences: differentValues,
    sameValues: sameValues,
  }
};

export function getOnlyFirstValues(obj1: object, obj2: object, originalObject1: object, rootname: string, onlyFirstValues = []) {
  for (var key in obj1) {
    const value = obj1[key];
    const path = originalObject1.paths()[value];

    if (typeof obj1[key] === 'object') {
      getOnlyFirstValues(obj1[key], obj2[key], originalObject1, rootname, onlyFirstValues);
    }
    else {
      if (!obj2 || !obj2[key]) {
        let value = obj1[key];
        const path2 = originalObject1.paths()[value];
        if (typeof value === 'function') return;
        onlyFirstValues.push({ path: path, value: value })
      }

    }
  }

  return onlyFirstValues;
}

export function getOnlySecondValues(obj1: object, obj2: object, originalObject2: object, rootname: string, onlySecondValues = []) {
  for (var key in obj2) {
    const value = obj2[key];
    const path = originalObject2.paths()[value];

    if (typeof obj2[key] === 'object') {
      getOnlySecondValues(obj1[key], obj2[key], originalObject2, rootname, onlySecondValues);
    }
    else {
      if (!obj1 || !obj1[key]) {
        let value = obj2[key];
        const path2 = originalObject2.paths()[value];
        if (typeof value === 'function') return;
        onlySecondValues.push({ path: path, value: value })
    }
  }
 }

 return onlySecondValues;
}

export function getDifferentValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, rootname: string, onlyDifferentValues = []) {
  for (var key in obj1) {
    if (typeof obj1[key] === 'object') {
      getDifferentValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname, onlyDifferentValues);
    }
    else {
      if (obj1 && obj2 && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        const val1 = obj1[key];
        const path1 = originalObject1.paths()[obj1[key]];
        const val2 = obj2[key];
        const path2 = originalObject2.paths()[obj2[key]];

        if (val1 !== val2) {
          onlyDifferentValues.push({ first: { path: path1, value: val1 }, second: { path: path2, value: val2 } })
        }
      }
    }
  }

  return onlyDifferentValues;
}

export function getSameValues(obj1: object, obj2: object, originalObject2: object, originalObject1: object, rootname: string, onlySameValues = []) {
  for (var key in obj1) {

    if (typeof obj1[key] === 'object') {
      getDifferentValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname, onlySameValues);
    }
    else {
      if (obj1 && obj2 && obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        const val1 = obj1[key];
        const path1 = originalObject1.paths()[obj1[key]];
        const val2 = obj2[key];
        const path2 = originalObject2.paths()[obj2[key]];

        if (val1 === val2) {
          onlySameValues.push({ first: { path: path1, value: val1 }, second: { path: path2, value: val2 } })
        }
      }
    }
  }

  return onlySameValues;
} 

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

export function unique(arr: any[], isMultiple = false): any[] {
 var uniques = _.map(_.groupBy(arr, function (item) {
  return isMultiple ? item.first.value : item.value;
 }), function (grouped) {
  return grouped[0];
 });
 return uniques;
}