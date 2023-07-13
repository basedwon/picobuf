// test/encoder.test.js
const Picobuf = require('../lib/picobuf')

const testData = [
  {
    title: 'Encoder Classes',
    path: 'User.encoder.constructor',
    label: 'should use ${expected} as encoder class',
    cases: [
      { input: 'none', expected: 'NoneEncoder' },
      { input: 'msgpack', expected: 'MsgPackEncoder' },
      { input: 'InvalidEncoder', expected: 'MsgPackEncoder' },
    ],
  },
]
describe('Encoder', () => {
  testData.forEach(suite => {
    describe(suite.title, () => {
      suite.cases.forEach(item => {
        it(_.template(suite.label)(item), () => {
          const pb = new Picobuf({ User: { name: 'string' }}, { encoder: item.input })
          expect(_.get(pb, suite.path).name).to.equal(item.expected)
        })
      })
    })
  })

  describe('Encoder encoding', () => {
    it('should encode and decode using the NoneEncoder', () => {
      const pb = new Picobuf(null, { encoder: 'none' })
      const TestModel = pb.createModel('TestModel', {
        field1: 'number',
        field2: 'string'
      })
      const data = {
        field1: 123,
        field2: 'abc'
      }
      const encoded = TestModel.encode(data)
      const decoded = TestModel.decode(encoded)
      expect(encoded).to.deep.equal([123, 'abc'])
      expect(decoded).to.deep.equal(data)
    })
    it('should encode and decode using the MsgPackEncoder', () => {
      const pb = new Picobuf(null, { encoder: 'msgpack' })
      const TestModel = pb.createModel('TestModel', {
        field1: 'number',
        field2: 'string'
      })
      const data = {
        field1: 123,
        field2: 'abc'
      }
      const encoded = TestModel.encode(data)
      expect(encoded).to.be.an.instanceof(Buffer)
      const decoded = TestModel.decode(encoded)
      expect(decoded).to.deep.equal(data)
    })
  })
})
