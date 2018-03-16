import { blockchain } from 'vineyard-blockchain';
import { AddressHistory, EthereumTransaction, TokenTransferRecord, Address, AddressResponse } from "../types"
import { log } from 'util';

const onlyFirst: any[] = [];
const onlySecond: any[] = [];
const differences: any[] = [];
const same: any[] = [];

export function checkValues(obj1, obj2, rootName): AddressResponse {
  for (var key in obj1) {
    if (typeof obj1[key] === 'object') {
      checkValues(obj1[key], obj2[key], rootName)
    }
    if (obj2 && obj1) getSameValues(obj1, obj2, key, rootName, [rootName]);
    if (obj2 && obj1) getDifferentValues(obj1, obj2, key, rootName, [rootName]);
    const firstVal = getOnlyFirstValues(obj1, obj2, key, rootName, [rootName])
  }

  for (var key in obj2) {
    getOnlySecondValues(obj1, obj2, key, rootName, [rootName])
  }

 return {
  differences: differences,
  same: same,
  onlyFirst: onlyFirst,
  onlySecond: onlySecond,
 }
};

export function getOnlyFirstValues(obj1, obj2, key, rootName, path) {
  
  
  if ('object' && obj2 == undefined || obj1.hasOwnProperty(key) !== obj2.hasOwnProperty(key)) {
    onlyFirst.push({ path: `${rootName}.${key}`, value: obj1[key] })
    return false;
  }
  else {
    return true
  }
}

export function getOnlySecondValues(obj1, obj2, key, rootName, path) {
  if (typeof (obj1[key]) == 'undefined') {
    onlySecond.push({ path: `${rootName}.${key}`, value: obj2[key] })
  }
}

export function getDifferentValues(obj1, obj2, key, rootName, path) {
  if (!obj1 || !obj2 || !obj1[key] || !obj2[key]) return false;

  if (obj1[key] != obj2[key]) {
    differences.push({ first: { path: `${rootName}.${key}`, value: obj1[key] }, second: { path: `${rootName}.${key}`, value: obj2[key] } })
  }
}

export function getSameValues(obj1, obj2, key, rootName, path) {
  if (!obj1 || !obj2) return;
  if (obj1[key] == obj2[key]) {
    same.push({ first: { path: `${rootName}.${key}`, value: obj1[key] }, second: { path: `${rootName}.${key}`, value: obj2[key] } })
  }
}