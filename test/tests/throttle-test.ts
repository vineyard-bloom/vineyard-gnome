require('source-map-support').install()
import { checkValues, checkValues2 } from "../../src/diffy"
const assert = require('assert');

const obj = require('./testData')
const obj2 = require('./testData2')
const testData = require('./test-data')
const second = 1000
const minute = 60 * second

describe('eth-scan', function () {
 this.timeout(10 * minute)
 
 beforeEach(async function () {

 })

 it('compares two address histories with one difference', async function () {
  // const addressInfo = await checkValues(obj, obj2);
  // console.log('got address info', JSON.stringify(addressInfo, null, 4));
  const addressInfo = await checkValues(obj, obj2);
  console.log('got address info', JSON.stringify(addressInfo, null, 4));
 })

})