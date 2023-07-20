const { _, log } = require('./utils')
const { Config } = require('./config')
const { GlobalDomain } = require('./domain')
const { Field } = require('./field')
const { Enum } = require('./enum')
const { MODEL_TYPES } = require('./const')
const { BaseEncoder } = require('./encoder')

/**
 * Represents a Model Builder.
 *
 * @class
 */
class ModelBuilder {
  /**
   * Creates a new instance of ModelBuilder.
   *
   * @param {Model} model - The model to be built.
   * @param {object} fields - The fields of the model.
   * @param {ConfigOptions} config - The configuration options for the model.
   * @param {Domain} domain - The domain for the model.
   */
  constructor(model, fields, config, domain) {
    this.model = model
    this.fields = fields
    this.config = config
    this.domain = domain
    this.type = null
  }
  /**
   * Fetches the fields for the model.
   * @returns {Array} An array of fields for the model.
   */
  getFields() {
    this.type = this.getInitialType()
    let input = _.clone(this.fields)
    if (this.type === MODEL_TYPES.ARRAY) {
      input = this.getFieldsArray(input)
    } else if (this.type === MODEL_TYPES.SINGLE) {
      input = this.getFieldsSingle(input)
    }
    return this.getFieldsObject(input)
  }
  /**
   * Determines the initial type of the model.
   * @returns {string} The initial type of the model.
   */
  getInitialType() {
    if (_.isString(this.fields))
      this.fields = { [this.config.singleProp]: this.fields }
    if (_.isPlainObject(this.fields)) {
      if (this.fields[this.config.singleProp])
        return MODEL_TYPES.SINGLE
      return MODEL_TYPES.OBJECT
    } else if (_.isArray(this.fields)) {
      return MODEL_TYPES.ARRAY
    }
  }
  /**
   * Converts the model fields into an array.
   * @param {Array} arr - The model fields to convert.
   * @returns {Array} The converted model fields.
   */
  getFieldsArray(arr) {
    return _.transform(arr, (o, f, i) => {
      let name, type, defaultValue
      if (_.isPlainObject(f)) {
        name = i
        type = f.type
        defaultValue = f.default
      } else if (_.isString(f)) {
        name = i
        type = f
      } else if (_.isArray(f)) {
        if (f.length) {
          const { type: fieldType } = Field.getFieldClass(f[0], this.config)
          if (fieldType) {
            name = i
            type = fieldType
          } else {
            name = f.shift()
          }
        } else {
          name = i
        }
        type = f.shift()
        defaultValue = f.shift()
      }
      if (!_.isNumber(name))
        this.type = MODEL_TYPES.OBJECT
      o[name] = { name, type, default: defaultValue }
    }, {})
  }
  /**
   * Fetches a single field from the model.
   * @param {string} input - The name of the field to fetch.
   * @returns {object} The fetched field.
   */
  getFieldsSingle(input) {
    return [input]
  }
  /**
   * Transforms an object of fields into an array of Field instances.
   * This method takes into account several field configurations such as `type`, `required`, `default`,
   * `repeated`, `enum` and creates a Field instance for each field definition.
   *
   * @param {Object} input - An object whose properties represent field definitions. 
   * Each property value could be a string (representing a type), or an object with detailed configuration.
   *
   * @returns {Array<Field>} An array of Field instances, each representing a field in the input.
   *
   * Here's what happens in detail:
   *
   * - If the field definition is a string, it's assumed to be the `type` of the field. An object is then created with the `type` set to the string.
   * - If the `type` of the field isn't explicitly set, it's defaulted to the `defaultFieldType` from the configuration.
   * - If the `required` property isn't explicitly set to a boolean, it's set based on the `strict` mode from the configuration. If strict mode is enabled, the field is considered `required`.
   * - If a `default` value is provided and strict mode is enabled, the field is marked as not `required`.
   * - If both a `default` value is provided and the field is marked as `required`, an error is thrown because this is an inconsistent state.
   * - If the field is marked as `repeated`, the `list` property is set to `true` and `repeated` is deleted.
   * - If the `type` of the field is an array, the actual `type` is set to the first element of the array and `list` is set to `true`.
   * - If the `type` starts with '*', the `required` property is set to `true` and the '*' is removed from the `type`.
   * - If `enum` or `values` properties are provided, the `type` is set to 'enum'.
   * - If the `type` is 'enum', depending on the `enum` property value:
   *    - If it's a string, it's assumed to be the name of an Enum instance which is fetched from the domain. The values from the Enum instance are also fetched.
   *    - If it's an Enum instance, its values are fetched.
   *    - If it's an array, it's used as the values for the Enum.
   * - Finally, an Enum instance is created if `enum` is not already an Enum instance.
   * - For each field, a Field instance is created with the name and the final configuration, and pushed to the array to be returned.
   */
  getFieldsObject(input) {
    const fields = []
    for (let [name, field] of _.entries(input)) {
      if (_.isString(field))
        field = { type: field }
      field.type = field.type || this.config.defaultFieldType
      field.required = _.isBoolean(field.required) ? field.required : !!this.config.strict
      if (!_.isNil(field.default) && this.config.strict) field.required = false
      if (!_.isNil(field.default) && field.required)
        throw new Error(`Field cannot both have a default and be required`)
      if (field.repeated) {
        field.list = true
        delete field.repeated
      }
      if (_.isArray(field.type)) {
        field.type = field.type[0]
        field.list = true
      }
      if (field.type.startsWith('*')) {
        field.type = field.type.slice(1)
        field.required = true
      }
      if (field.enum || field.values)
        field.type = 'enum'
      if (field.type === 'enum') {
        if (_.isString(field.enum)) {
          field.enum = this.domain.getEnum(field.enum)
          field.values = field.enum.values
        } else if (field.enum instanceof Enum) {
          field.values = field.enum.values
        } else if (_.isArray(field.enum)) {
          field.values = field.enum
        }
        if (!(field.enum instanceof Enum)) {
          field.enum = new Enum(`${this.model.name}.${name}`, field.values, this.config, this.domain)
        }
      }
      fields.push(new Field(name, field, this.config, this.domain))
    }
    return fields
  }
  /**
   * Fetches the encoder for the model.
   * @returns {Encoder} The encoder for the model.
   */
  getEncoder() {
    let encoder = this.config.encoder || this.config.defaultEncoder
    if (encoder instanceof BaseEncoder) return encoder
    const encoders = this.config.encoderClasses
    let encoderClass = this.getEncoderClass(encoder, encoders)
    if (_.isFunction(encoderClass) && encoderClass.prototype instanceof BaseEncoder)
      return new encoderClass(this.model)
    encoderClass = this.getEncoderClass(this.config.defaultEncoder, encoders)
    
    // log({ encoderClass }, this.config.default)
    return new encoderClass(this.model)
  }
  /**
   * Fetches the encoder class based on a string.
   * @param {string} encoder - The name of the encoder to fetch.
   * @param {object} encoders - The object containing the encoder classes keyed by class name.
   * @returns {function|undefined} The fetched encoder class.
   */
  getEncoderClass(encoder, encoders) {
    let encoderClass
    if (_.isString(encoder))
      for (const orig of _.keys(encoders))
        if (_.toLower(orig).replace(/encoder$/, '') === _.toLower(encoder))
          encoderClass = encoders[orig]
    return encoderClass
  }
  /**
   * Builds the model.
   * @returns {Model} The built model.
   */
  build() {
    const encoder = this.getEncoder()
    const fields = this.getFields()
    return { type: this.type, fields, encoder }
  }
}

/**
 * Represents a model.
 *
 * @class
 */
class Model {
  /**
   * Creates a new instance of Model.
   *
   * @param {string} name - The name of the model.
   * @param {Field[]} fields - The fields of the model.
   * @param {ConfigOptions} config - The configuration options for the model.
   * @param {Domain} [domain=GlobalDomain] - The domain for the model, defaults to GlobalDomain if none provided.
   */
  constructor(name, fields, config, domain = GlobalDomain) {
    this.name = name
    _.objProp(this, 'config', Config.getConfig(config))
    _.objProp(this, 'domain', domain)
    this.domain.setModel(this.name, this)
    _.assign(this, new ModelBuilder(this, fields, this.config, domain).build())
    return _.proxyGet(this, (target, prop, receiver) => {
      const field = target.fields.find(f => f.name === prop)
      if (field) return field
      return Reflect.get(target, prop, receiver)
    })
  }
  /**
   * Creates a new instance of the model with the provided data.
   *
   * @param {Object} data - The data for the new model instance.
   * @param {...*} args - Additional arguments.
   * @returns {*} The created model instance.
   */
  create(data, ...args) {
    let obj = {}
    if (this.type === MODEL_TYPES.ARRAY) {
      obj = []
      data = [data].concat(args)
    } else if (this.type === MODEL_TYPES.SINGLE) {
      obj = []
      data = [data]
    }
    for (const field of this.fields) {
      let value = data[field.name]
      if (_.isNil(value) && !_.isNil(field.default))
        value = field.default
      _.set(obj, field.name, value)
    }
    this.validate(obj)
    if (this.type === MODEL_TYPES.SINGLE)
      obj = obj.shift()
    return obj
  }
  /**
   * Validates the provided data against the model.
   *
   * @param {Object} data - The data to validate.
   * @returns {boolean} True if the data is valid, false otherwise.
   */
  validate(data) {
    for (const field of this.fields) {
      const value = _.get(data, field.name)
      if (_.isNil(value) && field.required)
        throw new Error(`Field ${field.name} is required`)
      if (field.list) {
        if (!_.isArray(value))
          throw new Error(`Field "${field.name}" should be an array of type ${field.type}`)
        for (const item of value)
          field.validate(item)
      } else
        field.validate(value)
    }
  }
  /**
   * Encodes the provided data.
   *
   * @param {Object} data - The data to encode.
   * @returns {string} The encoded data.
   */
  encode(data) {
    if (this.config.objectMode)
      return data
    if (this.type === MODEL_TYPES.SINGLE)
      data = [data]
    const arr = []
    for (const field of this.fields) {
      let value = _.get(data, field.name)
      if (field.list) {
        for (let ii = 0; ii < value.length; ii++)
          value[ii] = field.serialize(value[ii])
      } else
        value = field.serialize(value)
      arr.push(value)
    }
    return this.encoder.encode(arr)
  }
  /**
   * Decodes the provided input.
   *
   * @param {string} input - The input to decode.
   * @returns {Object} The decoded data.
   */
  decode(input) {
    if (this.config.objectMode) {
      this.validate(input)
      return input
    }
    const arr = this.encoder.decode(input)
    const data = this.type === MODEL_TYPES.OBJECT ? {} : []
    for (let ii = 0; ii < arr.length; ii++) {
      const field = this.fields[ii]
      let value = arr[ii]
      if (field.list) {
        for (let ii = 0; ii < value.length; ii++)
          value[ii] = field.deserialize(value[ii])
      } else
        value = field.deserialize(value)
      _.set(data, field.name, value)
    }
    this.validate(data)
    if (this.type === MODEL_TYPES.SINGLE)
      return data.shift()
    return data
  }
}

module.exports = { Model, ModelBuilder }
