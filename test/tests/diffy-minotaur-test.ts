require('source-map-support').install()
// import { checkValues, checkValues2 } from "../../src/diffy"
import { assert } from 'chai'
import { startEthereumMonitor, createEthereumVillage, EthereumVillage } from "vineyard-minotaur/lab/ethereum-explorer-service"
import { EthereumModel } from "vineyard-minotaur/src"
import { localConfig } from "../config/config"

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
  await startEthereumMonitor(village, {
   queue: { maxSize: 10, minSize: 5 },
   maxMilliseconds: 1 * minute
  })
  assert(true)
 })
})