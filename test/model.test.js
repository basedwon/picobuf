const { Picobuf, Domain } = require('../lib/picobuf')

const testData = [
  {
    title: 'Model Types',
    path: 'User.type',
    label: 'should accept ${expected} as model definition',
    cases: [
      { input: { name: 'string' }, expected: 'object' },
      { input: [['string']], expected: 'array' },
      { input: { fieldType: 'string' }, expected: 'single' },
    ],
  },
]
describe('Model', () => {
  testData.forEach(suite => {
    describe(suite.title, () => {
      suite.cases.forEach(item => {
        it(_.template(suite.label)(item), () => {
          const pb = new Picobuf({ User: item.input }, null, new Domain())
          expect(_.get(pb, suite.path)).to.equal(item.expected)
        })
      })
    })
  })

  describe('Model Fields', () => {
    let pb
    beforeEach(() => {
      pb = new Picobuf(null, null, new Domain())
    })
    it('should create a model with fields', () => {
      const TestModel = pb.createModel('TestModel', {
        field1: 'number',
        field2: 'string',
        field3: 'boolean'
      })
      const data = {
        field1: 123,
        field2: 'abc',
        field3: true
      }
      const testInstance = TestModel.create(data)
      expect(testInstance).to.deep.equal(data)
    })

    it('should validate the fields of a model', () => {
      const TestModel = pb.createModel('TestModel', {
        field1: 'number',
        field2: 'string',
        field3: 'boolean'
      })
      const data = {
        field1: 123,
        field2: 'abc',
        field3: 'true' // Invalid boolean value
      }
      expect(() => TestModel.validate(data)).to.throw('Invalid type for field field3. Expected boolean, got string')
    })

    it('should encode and decode a model', () => {
      const TestModel = pb.createModel('TestModel', {
        field1: 'number',
        field2: 'string',
        field3: 'boolean'
      })
      const data = {
        field1: 123,
        field2: 'abc',
        field3: true
      }
      const encoded = TestModel.encode(data)
      const decoded = TestModel.decode(encoded)
      expect(decoded).to.deep.equal(data)
    })
  
    it('should encode and decode a model with a repeated field', () => {
      const TestModel = pb.createModel('TestModel', {
        field1: { type: ['number']},
        field2: 'string',
        field3: 'boolean'
      })
      const data = {
        field1: [123, 456],
        field2: 'abc',
        field3: true
      }
      const encoded = TestModel.encode(data)
      const decoded = TestModel.decode(encoded)
      expect(decoded).to.deep.equal(data)
    })
    
    it('should encode and decode a model with an enum field', () => {
      const TestEnum = pb.createEnum('TestEnum', ['VALUE1', 'VALUE2', 'VALUE3'])
      const TestModel = pb.createModel('TestModel', {
        field1: { enum: TestEnum },
        field2: 'string',
        field3: 'boolean'
      })
      const data = {
        field1: TestEnum.VALUE2,
        field2: 'abc',
        field3: true
      }
      const encoded = TestModel.encode(data)
      const decoded = TestModel.decode(encoded)
      expect(decoded).to.deep.equal(data)
    })
  
    it('should encode and decode a model with nested models', () => {
      const NestedModel = pb.createModel('NestedModel', {
        nestedField: 'string'
      })
      const TestModel = pb.createModel('TestModel', {
        field1: 'number',
        field2: 'NestedModel',
        field3: 'boolean'
      })
      const data = {
        field1: 123,
        field2: {
          nestedField: 'abc'
        },
        field3: true
      }
      const encoded = TestModel.encode(data)
      const decoded = TestModel.decode(encoded)
      expect(decoded).to.deep.equal(data)
    })
  })
})
