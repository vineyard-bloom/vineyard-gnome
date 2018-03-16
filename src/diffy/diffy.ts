import { blockchain } from 'vineyard-blockchain';
import { AddressHistory, EthereumTransaction, TokenTransferRecord, Address, AddressResponse } from "../types"
import { log } from 'util';

const onlyFirst: any[] = [];
const onlySecond: any[] = [];
const differences: any[] = [];
const same: any[] = [];

export function checkValues(obj1, obj2): AddressResponse {
 for (var p in obj1) {
   if (obj2 == undefined || obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
    onlyFirst.push({ path: `obj1.${p}`, value: obj1[p] })
    break;
  }

  switch (typeof (obj1[p])) {
   case 'object':
      checkValues(obj1[p], obj2[p])
    break;

   default:
    if (obj1[p] != obj2[p]) {
     differences.push({ first: { path: `obj1.${p}`, value: obj1[p] }, second: { path: `obj2.${p}`, value: obj2[p] } })
    }
    if (obj1[p] == obj2[p]) {
     same.push({ first: { path: `obj1.${p}`, value: obj1[p] }, second: { path: `obj2.${p}`, value: obj2[p] } })
    }
  }
 }

 for (var p in obj2) {
  if (typeof (obj1[p]) == 'undefined') {
   onlySecond.push({ path: `obj2.${p}`, value: obj2[p] })
  }
 }
 return {
  differences: differences,
  same: same,
  onlyFirst: onlyFirst,
  onlySecond: onlySecond,
 }
};