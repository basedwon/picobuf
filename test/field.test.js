// field.test.js tests
const { Picobuf, Enum, Domain } = require('../lib/picobuf')
const { StringField,
  BooleanField,
  NumberField,
  IntegerField,
  FloatField,
  EnumField,
  JsonField,
  BufferField,
  ForeignField,
} = require('../lib/field')

describe('Field', () => {
  describe('StringField', () => {
    it('should validate a string value', () => {
      const field = new StringField('name', { type: 'string' })
      expect(() => field.validate('value')).to.not.throw()
      expect(() => field.validate(123)).to.throw('Invalid type for field name. Expected string, got number')
    })
    it('should serialize and deserialize a string value', () => {
      const field = new StringField('name', { type: 'string' })
      const serialized = field.serialize('value')
      expect(serialized).to.equal('value')
      const deserialized = field.deserialize('value')
      expect(deserialized).to.equal('value')
    })
  })

  describe('BooleanField', () => {
    it('should validate a boolean value', () => {
      const field = new BooleanField('active', { type: 'boolean' })
      expect(() => field.validate(true)).to.not.throw()
      expect(() => field.validate(false)).to.not.throw()
      expect(() => field.validate('true')).to.throw('Invalid type for field active. Expected boolean, got string')
    })

    it('should serialize and deserialize a boolean value', () => {
      const field = new BooleanField('active', { type: 'boolean' })

      const serializedTrue = field.serialize(true)
      expect(serializedTrue).to.equal(1)

      const serializedFalse = field.serialize(false)
      expect(serializedFalse).to.equal(0)

      const deserializedTrue = field.deserialize(serializedTrue)
      expect(deserializedTrue).to.be.true

      const deserializedFalse = field.deserialize(serializedFalse)
      expect(deserializedFalse).to.be.false
    })
  })

  describe('NumberField', () => {
    it('should validate a number value', () => {
      const field = new NumberField('age', { type: 'number' })
      expect(() => field.validate(25)).to.not.throw()
      expect(() => field.validate('25')).to.throw('Invalid type for field age. Expected number, got string')
    })

    it('should serialize and deserialize a number value', () => {
      const field = new NumberField('age', { type: 'number' })
      const serialized = field.serialize(25)
      expect(serialized).to.equal(25)
      const deserialized = field.deserialize(25)
      expect(deserialized).to.equal(25)
    })
  })

  describe('IntegerField', () => {
    it('should validate an integer value', () => {
      const field = new IntegerField('age', { type: 'integer' })

      expect(() => field.validate(25)).to.not.throw()
      expect(() => field.validate(25.5)).to.throw('Invalid type for field age. Expected Integer, got number')
    })

    it('should serialize and deserialize an integer value', () => {
      const field = new IntegerField('age', { type: 'integer' })

      const serialized = field.serialize(25)
      expect(serialized).to.equal(25)

      const deserialized = field.deserialize(25)
      expect(deserialized).to.equal(25)
    })
  })

  describe('FloatField', () => {
    it('should validate a float value', () => {
      const field = new FloatField('price', { type: 'float' })
      
      expect(() => field.validate(25.5)).to.not.throw()
      expect(() => field.validate('25.5')).to.throw('Invalid type for field price. Expected float, got string')
    })

    it('should serialize and deserialize a float value', () => {
      const field = new FloatField('price', { type: 'float' })

      const serialized = field.serialize(25.5)
      expect(serialized).to.equal('25.5')

      const deserialized = field.deserialize('25.5')
      expect(deserialized).to.equal(25.5)
    })
  })

  describe('EnumField', () => {
    let field
    beforeEach(() => {
      const rankEnum = new Enum('Rank', ['ROOKIE', 'VETERAN'])
      field = new EnumField('rank', {
        type: 'enum',
        values: rankEnum.values,
        enum: rankEnum,
      })
    })
    it('should validate an enum value', () => {
      expect(() => field.validate('ROOKIE')).to.not.throw()
      expect(() => field.validate('CHAMPION')).to.throw('Invalid enum value CHAMPION')
    })

    it('should serialize and deserialize an enum value', () => {
      const serialized = field.serialize('ROOKIE')
      expect(serialized).to.equal(0)

      const deserialized = field.deserialize(0)
      expect(deserialized).to.equal('ROOKIE')
    })
  })

  describe('JsonField', () => {
    it('should validate an object value', () => {
      const field = new JsonField('data', { type: 'json' })

      expect(() => field.validate({})).to.not.throw()
      expect(() => field.validate(123)).to.throw('Invalid type for field data. Expected Object, got number')
    })

    it('should serialize and deserialize an object value', () => {
      const field = new JsonField('data', { type: 'json' })

      const serialized = field.serialize({ name: 'John' })
      expect(serialized).to.deep.equal({ name: 'John' })

      const deserialized = field.deserialize({ name: 'John' })
      expect(deserialized).to.deep.equal({ name: 'John' })
    })
  })

  describe('BufferField', () => {
    it('should validate a buffer value', () => {
      const field = new BufferField('data', { type: 'buffer' })
      
      expect(() => field.validate(Buffer.from('data'))).to.not.throw()
      expect(() => field.validate('data')).to.throw('Invalid type for field data. Expected Buffer, got string')
    })

    it('should serialize and deserialize a buffer value', () => {
      const field = new BufferField('data', { type: 'buffer' })

      const serialized = field.serialize(Buffer.from('data'))
      expect(serialized).to.deep.equal(Buffer.from('data'))

      const deserialized = field.deserialize(Buffer.from('data'))
      expect(deserialized).to.deep.equal(Buffer.from('data'))
    })
  })

  describe('ForeignField', () => {
    let field
    beforeEach(() => {
      const pb = new Picobuf(null, null, new Domain())
      const ForeignModel = pb.createModel('ForeignModel', {
        field1: 'integer',
        field2: 'string'
      })
      field = new ForeignField('data', { type: 'ForeignModel' }, null, pb.domain)
    })
    it('should validate a value with a foreign model', () => {
      const data = {
        field1: 123,
        field2: 'abc'
      }

      expect(() => field.validate(data)).to.not.throw()
      // expect(() => field.validate('data')).to.throw('Field field1 is required')
      expect(() => field.validate({ field1: 123.45, field2: 'abc' })).to.throw('Invalid type for field field1. Expected Integer, got number')
    })

    it('should serialize and deserialize a value with a foreign model', () => {
      const data = {
        field1: 123,
        field2: 'abc'
      }

      const serialized = field.serialize(data)
      expect(serialized).to.be.instanceof(Buffer)

      const deserialized = field.deserialize(serialized)
      expect(deserialized).to.deep.equal(data)
    })
  })
})
