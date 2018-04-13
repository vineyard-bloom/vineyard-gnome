require('source-map-support').install()
import { checkValues, checkValues2, validateAndNormalize } from "../../src/diffy"
const assert = require('assert');
import { startEthereumMonitor, createEthereumVillage, EthereumVillage } from "vineyard-minotaur/lab/ethereum-explorer-service"
import { EthereumModel } from "vineyard-minotaur/src"
import { localConfig } from "../config/config"
const testData = require('./test-data')
const testData2 = require('./test-data2')
let transactionList = [];

const second = 1000
const minute = 60 * second
const addressToTest = '0xB97048628DB6B661D4C2aA833e95Dbe1A905B280'

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
  await model.LastBlock.create({ currency: 2, blockIndex: 4000000 })
  console.log('Initialized village')
  const monitorData  = await startEthereumMonitor(village, {
   queue: { maxSize: 5, minSize: 1 },
   maxMilliseconds: 1 * minute
  })

  const addressToCheck = await village.model.Address.first({
   address: addressToTest
  })

  const transactionList = await village.model.Transaction.filter({
   to: addressToCheck.id
  })

  const minotaurObject = {
   address:addressToTest,
   transactionList: transactionList.splice(0, 5),
  }
  const testObject = {
   address:addressToTest,
   transactionList: testData.transactions.splice(0, 5),
  }

  const objs = await validateAndNormalize(testObject, minotaurObject)
  const addressInfo = await checkValues(objs.normalizedObj1, objs.normalizedObj2);
  console.log('got address info');

 })
 
 xit('from 4mil fails check', async function () {
  await model.LastBlock.create({ currency: 2, blockIndex: 4000000 })
  const monitorData = await startEthereumMonitor(village, {
   queue: { maxSize: 5, minSize: 1 },
   maxMilliseconds: 1 * minute
  })

  const addressToCheck = await village.model.Address.first({
   address: addressToTest
  })

  const transactionList = await village.model.Transaction.filter({
   to: addressToCheck.id
  })

  const minotaurObject = {
   address: addressToTest,
   blah: 'this value is only on this object',
   diff: 'val1',
   transactionList: transactionList.splice(0, 2),
  }

  const testObject = {
   address: addressToTest,
   bleh: 'this value only shows up o thihis object',
   diff: 'val1',
   transactionList: testData.transactions.splice(0, 2),
  }

  const objs = await validateAndNormalize(testObject, minotaurObject)
  const addressInfo = await checkValues(objs.normalizedObj1, objs.normalizedObj2);
  console.log('got address info');
 })

})