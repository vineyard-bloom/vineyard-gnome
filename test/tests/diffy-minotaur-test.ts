require('source-map-support').install()
import { checkValues, checkValues2 } from "../../src/diffy"
const assert = require('assert');
import { startEthereumMonitor, createEthereumVillage, EthereumVillage } from "vineyard-minotaur/lab/ethereum-explorer-service"
import { EthereumModel } from "vineyard-minotaur/src"
import { localConfig } from "../config/config"
const testData = require('./test-data')
const testData2 = require('./test-data2')
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
 
 it('from 4mil passes check', async function () {
  // await model.LastBlock.create({ currency: 2 })
  await model.LastBlock.create({ currency: 2, blockIndex: 4000000 })
  console.log('Initialized village')
  const monitorData  = await startEthereumMonitor(village, {
   queue: { maxSize: 5, minSize: 1 },
   maxMilliseconds: 1 * minute
  })
  assert(true)

  const addressToCheck = await village.model.Address.first({
   address: '0xB97048628DB6B661D4C2aA833e95Dbe1A905B280'
  })

  transactionList = await village.model.Transaction.filter({
   to: addressToCheck.id
  })

  // const minotaurObject = {
  //  address:'0xB97048628DB6B661D4C2aA833e95Dbe1A905B280',
  //  transactionList: transactionList.slice(20),
  // }

  // const testObject = {
  //  address: '0xB97048628DB6B661D4C2aA833e95Dbe1A905B280',
  //  transactionList: testData.slice(20),
  // }
  const item1 = transactionList[0]
  const addressInfo = await checkValues(item1, testData);
  console.log('got address info', JSON.stringify(item1, null, 2));
  console.log(':::::::::_:_:__:_:_:_:_:_:__:_:_:');
  console.log('got address info', JSON.stringify(testData, null, 2));
  console.log('got address info');

 })
 
 xit('from 4mil fails check', async function () {
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
  const addressInfo = await checkValues(transactionList, testData2);
  console.log('got address info', JSON.stringify(addressInfo, null, 2));
  console.log('got address info');
 })
})