import { blockchain } from 'vineyard-blockchain';
import { AddressHistory, EthereumTransaction, TokenTransferRecord, Address, AddressResponse } from "../types"
import { log } from 'util';
import { _ } from 'lodash';

const assert = require('assert');

export function checkValues(obj1: object, obj2: object, originalObject1: object, originalObject2: object, rootname: string, onlyFirst: any[], onlySecond: any[], differences: any[], same: any[]): AddressResponse {

  for (var key in obj1) {
    if (typeof obj1[key] === 'object') {
      checkValues(obj1[key], obj2[key], originalObject1, originalObject2, rootname, onlyFirst, onlySecond, differences, same);
    }
    else {
      const val1 = obj1[key];
      const path1 = originalObject1.paths()[obj1[key]];
      
      if (!obj2 || !obj2[key] && obj1[key]) {
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

  return {
    differences: uniqueFirstAndSecond(differences),
    same: uniqueFirstAndSecond(same),
    onlyFirst: unique(onlyFirst),
    onlySecond: unique(onlySecond),
  }
};

export async function getOnlyFirstValues(value: any, path: any[], rootname: string, onlyFirst: any[]) {
  if (typeof value === 'function') return;
  path[0].unshift(rootname)
  onlyFirst.push({ path: path, value: value})
}

export function getOnlySecondValues(value: any, path: any[], rootname: string, onlySecond: any[]) {
  if(typeof value === 'function') return;
  path[0].unshift(rootname)
  onlySecond.push({ path: path, value: value})
}

export function getDifferentValues(val1:any, val2:any, path1:string[], path2:string[], rootname: string, differences: any[]) {
  path1[0].unshift(rootname)
  path2[0].unshift(rootname)
  differences.push({ first: { path: path1, value: val1 }, second: { path: path2, value: val2 } })
}

export function getSameValues(val1: any, val2: any, path1: string[], path2: string[], rootname: string, same: any[]) {
  path1[0].unshift(rootname)
  path2[0].unshift(rootname)
  same.push({ first: { path: path1, value: val1 }, second: { path: path2, value: val2 } });
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

export function uniqueFirstAndSecond(arr: any[]): any[] {
  var uniques = _.map(_.groupBy(arr, function (item) {
    return item.first.value;
  }), function (grouped) {
    return grouped[0];
  });
  return uniques;
}

export function unique(arr: any[]): any[] {
  var uniques = _.map(_.groupBy(arr, function (item) {
    return item.value;
  }), function (grouped) {
    return grouped[0];
  });
  return uniques;
}