require('source-map-support').install()
import { compare } from "../../src/diffy"
const obj = require('./testData') // same

const second = 1000
const minute = 60 * second

describe('eth-scan', function () {
 this.timeout(10 * minute)

 beforeEach(async function () {

 })

 xit('compares two address histories with zero differences', async function () {
  const addressInfo = await compare({ foo: 'bar' }, { foo: 'bar' }, [], 'fish');
  console.log('got address info', addressInfo);
 })

 it('compares two address histories with one difference', async function () {
  const addressInfo = await compare(obj.foo, obj.bar, [], 'pony');
  console.log('got address info', addressInfo);
 })

})