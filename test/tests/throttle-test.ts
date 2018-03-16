require('source-map-support').install()
import { paths, checkValues } from "../../src/diffy"
const assert = require('assert');

const obj = require('./testData')
const obj2 = require('./testData2')
const second = 1000
const minute = 60 * second

describe('eth-scan', function () {
 this.timeout(10 * minute)

 beforeEach(async function () {

 })

 it('compares two address histories with one difference', async function () {
  const addressInfo = await checkValues(obj, obj2, 'coyoteUgly');
  console.log('got address info', addressInfo);
 })

})