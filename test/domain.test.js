const { Picobuf, Model, Domain, Enum } = require('../lib/picobuf')

describe('Domain', () => {
  describe('createModel', () => {
    it('should create a model and add it to the models map', () => {
      const pb = new Picobuf()
      const domain = pb.domain
      const model = domain.createModel('User', {
        name: 'string',
        age: 'number',
      }, {}, Model)
      expect(domain.getModel('User')).to.equal(model)
    })
  })

  describe('setModel', () => {
    it('should set a model in the models map', () => {
      const pb = new Picobuf()
      const domain = pb.domain
      const model = new Model('User', { name: 'string', age: 'number' })
      domain.setModel('User', model)
      expect(domain.getModel('User')).to.equal(model)
    })
  })

  describe('getModel', () => {
    it('should retrieve a model from the models map', () => {
      const pb = new Picobuf()
      const domain = pb.domain
      const model = new Model('User', { name: 'string', age: 'number' })
      domain.setModel('User', model)
      expect(domain.getModel('User')).to.equal(model)
    })

    it('should return undefined if the model does not exist', () => {
      const domain = new Domain()
      expect(domain.getModel('User')).to.be.undefined
    })
  })

  describe('createEnum', () => {
    it('should create an enum and add it to the enums map', () => {
      const pb = new Picobuf()
      const domain = pb.domain
      const enumValues = ['VALUE1', 'VALUE2', 'VALUE3']
      const enumInstance = domain.createEnum('TestEnum', enumValues, {}, Enum)
      expect(domain.getEnum('TestEnum')).to.equal(enumInstance)
    })
  })

  describe('setEnum', () => {
    it('should set an enum in the enums map', () => {
      const domain = new Domain()
      const enumValues = ['VALUE1', 'VALUE2', 'VALUE3']
      const enumInstance = new Enum('TestEnum', enumValues, {})
      domain.setEnum('TestEnum', enumInstance)
      expect(domain.getEnum('TestEnum')).to.equal(enumInstance)
    })
  })

  describe('getEnum', () => {
    it('should retrieve an enum from the enums map', () => {
      const domain = new Domain()
      const enumValues = ['VALUE1', 'VALUE2', 'VALUE3']
      const enumInstance = new Enum('TestEnum', enumValues, {})
      domain.setEnum('TestEnum', enumInstance)
      expect(domain.getEnum('TestEnum')).to.equal(enumInstance)
    })

    it('should return undefined if the enum does not exist', () => {
      const domain = new Domain()
      expect(domain.getEnum('TestEnum')).to.be.undefined
    })
  })
})
