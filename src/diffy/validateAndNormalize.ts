import { blockchain } from 'vineyard-blockchain';
import { AddressHistory, EthereumTransaction, TokenTransferRecord, Address, AddressResponse } from "../types"
const Ajv = require('ajv');
const assert = require('assert');
const ajv = new Ajv();
const validation = require('./validationSchema.json')
/**
 * checkValues
 *
 * @param {testObject: object} a REQUIRED object to check
 * @param {minotaurObject: object} a REQUIRED object to compare obj1 against
 * @returns AddressResponse which is an object of the previously defined arrays
 */

export async function validateAndNormalize(testObject: object, minotaurObject: object): any {
 const obj1String = JSON.stringify(testObject)
 const normalizedObj1 = JSON.parse(obj1String)

 const obj2String = JSON.stringify(minotaurObject)
 const normalizedObj2 = JSON.parse(obj2String)
 const validate = ajv.compile(validation);

 normalizedObj1.transactionList.forEach( transaction => {
  var valid1 = validate(transaction);
  if (!valid1) console.log('_:_::_:__:_:_::_:__:_::_:__:_:_:_:_:_:_:_:',validate.errors);
 });

 normalizedObj2.transactionList.forEach( transaction => {
  var valid2 = validate(transaction);
  if (!valid2) console.log('_:_::_:__:_:_::_:__:_::_:__:_:_:_:_:_:_:_:',validate.errors);
 });
 
 return { normalizedObj1, normalizedObj2 }
};