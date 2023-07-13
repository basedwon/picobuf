// picobuf.test.js

const { Picobuf, Model, Domain } = require('../lib/picobuf')

describe('Picobuf', () => {
  describe('Component creation', () => {
    let pb
    beforeEach(() => {
      pb = new Picobuf(null, null, new Domain())
    })
    it('should create a Model with fields', () => {
      const User = pb.createModel('User', { name: 'string', age: 'integer' })
      expect(User.fields.length).to.equal(2)
      expect(User).to.be.instanceof(Model)
    })
    // @todo
    it('should create an Enum with values', () => {})
    it('should create a Service with methods', () => {})
    // other:
    // enum:
    it('should add an enum value to an existing enum instance', () => {})
  })
})
