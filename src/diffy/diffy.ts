import { blockchain } from 'vineyard-blockchain';
import { AddressHistory, EthereumTransaction, TokenTransferRecord, Address, AddressResponse } from "../types"
import { log } from 'util';
//SingleTransaction
const onlyFirst: any[] = [];
const onlySecond: any[] = [];
const differences: any[] = [];
const same: any[] = [];

export function compare(first: any, second: any, path: string[], secondName: string): AddressResponse {
 let messages: string[] = []
 for (let i in first) {
  const secondValue = second ? second[i] : undefined
  if (secondValue === undefined) {
   onlyFirst.push({ path: `first.${i}`, value: first[i] })
   const pathString = path.concat(i).join('.')
   messages.push(secondName + ' is missing ' + pathString)
  }

  if (secondValue && secondValue !== first[i]) {
   differences.push({ first: { path: `first.${i}`, value: first[i] }, second: { path: `second.${i}`, value: second[i] }})
  }

  if (secondValue === first[i]) {
   same.push({ first: { path: `first.${i}`, value: first[i] }, second: { path: `second.${i}`, value: second[i] } })
  }

  const firstValue = first[i]
  if (firstValue && typeof firstValue === 'object') {
   messages = messages.concat(compare(firstValue, secondValue, path.concat(i), secondName))
  }
 }

 for (let i in second) {
  const firstValue = first ? first[i] : undefined
  if (firstValue === undefined) {
   onlySecond.push({ path: `second.${i}`, value: second[i] })
   const pathString = path.concat(i).join('.')
   messages.push(secondName + ' is missing ' + pathString)
  }

  const secondValue = second[i]
  if (secondValue && typeof secondValue === 'object') {
   messages = messages.concat(compare(firstValue, secondValue, path.concat(i), secondName))
  }
 }

 return {
  differences: differences,
  same: same,
  onlyFirst: onlyFirst,
  onlySecond: onlySecond,
 }
}