import { blockchain } from 'vineyard-blockchain';
import { AddressHistory, EthereumTransaction, TokenTransferRecord, Address, AddressResponse } from "../types"
import { log } from 'util';
import { _ } from 'lodash';

const assert = require('assert');

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
 return { normalizedObj1, normalizedObj2 }
};