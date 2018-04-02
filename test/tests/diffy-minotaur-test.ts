require('source-map-support').install()
import { checkValues, checkValues2 } from "../../src/diffy"
const assert = require('assert');
import { startEthereumMonitor, createEthereumVillage, EthereumVillage } from "vineyard-minotaur/lab/ethereum-explorer-service"
import { EthereumModel } from "vineyard-minotaur/src"
import { localConfig } from "../config/config"
const testData = require('./test-data')
let transactionList = [];

const second = 1000
const minute = 60 * second


describe('ethh-scan', function () {
 this.timeout(10 * minute)
 let village: EthereumVillage
 let model: EthereumModel

 beforeEach(async function () {
  village = await createEthereumVillage(localConfig)
  model = village.model
  await (model.ground as any).regenerate()
  await model.Currency.create({ name: 'Ethereum' })
  await model.Currency.create({ name: 'Bitcoin' })
 })
 
 it('from 4mil', async function () {
  // await model.LastBlock.create({ currency: 2 })
  await model.LastBlock.create({ currency: 2, blockIndex: 4000000 })
  console.log('Initialized village')
  const monitorData  = await startEthereumMonitor(village, {
   queue: { maxSize: 10, minSize: 5 },
   maxMilliseconds: 1 * minute
  })
  assert(true)

  const addressToCheck = await village.model.Address.first({
   address: '0xB97048628DB6B661D4C2aA833e95Dbe1A905B280'
  })

  transactionList = await village.model.Transaction.filter({
   to: addressToCheck.id
  })
  // const addressInfo = await checkValues({obj: 'ject'}, {obj: 'ect'});
  // console.log('got address info', JSON.stringify(addressInfo, null, 2));
 })

 it('checks an address', async function () {
  // const addressInfo = await checkValues2(testData, testData);
  // console.log('got address info', JSON.stringify(addressInfo, null, 2));
 })
})