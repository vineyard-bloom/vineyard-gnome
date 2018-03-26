import { blockchain } from 'vineyard-blockchain';
import { AddressHistory, EthereumTransaction, TokenTransferRecord, Address, AddressResponse } from "../types"
import { log } from 'util';
import { _ } from 'lodash';

const assert = require('assert');

let onlyFirst: any[] = [];
let onlySecond: any[] = [];
let differences: any[] = [];
let same: any[] = [];

export function checkValues(obj1, obj2, originalObject1, originalObject2, rootname): AddressResponse {

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
          getDifferentValues(obj1, obj2, originalObject1, originalObject2, key, rootname);
        }
        const aval = obj1[key];
        const aval2 = obj2[key];
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

  return {
    differences: uniqueFirstAndSecond(differences),
    same: uniqueFirstAndSecond(same),
    onlyFirst: unique(onlyFirst),
    onlySecond: unique(onlySecond),
  }
};

export async function getOnlyFirstValues(obj1, obj2, originalObject1, originalObject2, key) {
  const value = obj1[key];
  if (typeof value === 'function') return;
  onlyFirst.push({ path: originalObject1.paths()[obj1[key]], value: obj1[key] })
}

export function getOnlySecondValues(obj1, obj2, originalObject1, originalObject2, key) {
  const value = obj2[key];
  if(typeof value === 'function') return;
  onlySecond.push({ path: originalObject2.paths()[value], value: obj2[key] })
}

export function getDifferentValues(obj1, obj2, originalObject1, originalObject2, key, rootname) {
  let path = originalObject1.paths()[obj1[key]];
  path[0].unshift(rootname)
  differences.push({ first: { path: path , value: obj1[key] }, second: { path: originalObject2.paths()[obj2[key]], value: obj2[key] } })
}

export function getSameValues(obj1, obj2, originalObject1, originalObject2, key) {
  same.push({ first: { path: originalObject1.paths()[obj1[key]], value: obj1[key] }, second: { path: originalObject2.paths()[obj2[key]], value: obj2[key] } }) : null;
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

export function uniqueFirstAndSecond(arr) {
  var uniques = _.map(_.groupBy(arr, function (item) {
    return item.first.value;
  }), function (grouped) {
    return grouped[0];
  });
  return uniques;
}

export function unique(arr) {
  var uniques = _.map(_.groupBy(arr, function (item) {
    return item.value;
  }), function (grouped) {
    return grouped[0];
  });
  return uniques;
}