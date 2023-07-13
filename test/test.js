const { _, log } = require('../lib/utils')
require('@basd/testr').explode()
require('./index.n.test')

// const { Picobuf, Enum, Model, GlobalDomain, Domain } = require('../lib/picobuf')

async function test() {
  await run()
}

module.exports = test
