const { _, log } = require('./utils')
const Big = require('big.js')

/**
 * Represents a Field.
 *
 * @class
 */
class Field {
  /**
   * Creates a new instance of Field.
   *
   * @param {string} name - The name of the field.
   * @param {FieldOption} field - The field option for the field.
   * @param {ConfigOptions} config - The configuration options for the field.
   * @param {Domain} domain - The domain for the field.
   */
  constructor(name, field, config, domain) {
    let { fieldClass, type } = Field.getFieldClass(field.type, config)
    if (!fieldClass) {
      fieldClass = config.fieldClasses.ForeignField
    } else {
      field.type = type
    }
    return new fieldClass(name, field, config, domain)
  }
  static getFieldClass(type, config) {
    const className = _.upperFirst(type) + 'Field'
    let fieldClass = config.fieldClasses[className]
    if (!fieldClass) {
      for (let [key, value] of _.entries(config.fieldClasses)) {
        if (value.aliases.includes(type)) {
          type = _.toLower(key).replace(/field$/, '')
          fieldClass = value
        }
      }
    }
    if (!fieldClass) return {}
    return { type, fieldClass }
  }
}

/**
 * Represents a base field. This is an abstract base class and cannot be instantiated directly.
 *
 * @class
 */
class BaseField {
  static aliases = []
  /**
   * Creates a new instance of BaseField.
   *
   * @param {string} name - The name of the field.
   * @param {Object} field - An object representing the field. This object should include 'type', 'required', 'default', and 'list' properties.
   * @param {ConfigOptions} config - The configuration options for the field.
   * @param {Domain} domain - The domain for the field.
   * @throws {TypeError} If attempted to be instantiated directly.
   */
  constructor(name, field, config, domain) {
    if (new.target === BaseField)
      throw new TypeError('Cannot construct BaseField instances directly')
    this.name = name
    this.type = field.type
    this.required = field.required
    if (!_.isNil(field.default))
      this.default = field.default
    if (_.isBoolean(field.list))
      this.list = field.list
    _.objProp(this, 'config', config)
    _.objProp(this, 'domain', domain)
  }
  /**
   * Validates the provided value against the field.
   *
   * @param {*} value - The value to validate.
   * @throws {Error} If the value is of an incorrect type for the field.
   */
  validate(value) {
    if (typeof value !== this.type)
      throw new Error(`Invalid type for field ${this.name}. Expected ${this.type}, got ${typeof value}`)
  }
  /**
   * Serializes the provided data.
   *
   * @param {*} data - The data to serialize.
   * @returns {*} The serialized data.
   */
  serialize(data) {
    return data
  }
  /**
   * Deserializes the provided data.
   *
   * @param {*} data - The data to deserialize.
   * @returns {*} The deserialized data.
   */
  deserialize(data) {
    return data
  }
}

/**
 * Represents a string field.
 *
 * @class
 * @extends {BaseField}
 */
class StringField extends BaseField {
  static aliases = ['str']
}

/**
 * Represents a boolean field.
 *
 * @class
 * @extends {BaseField}
 */
class BooleanField extends BaseField {
  static aliases = ['bool']
  /**
   * Validates the provided boolean value.
   *
   * @param {*} value - The value to validate.
   * @throws {Error} If the value is not a boolean.
   */
  validate(value) {
    if (!_.isBoolean(value))
      throw new Error(`Invalid type for field ${this.name}. Expected boolean, got ${typeof value}`)
  }
  /**
   * Serializes the provided boolean value to 1 (for true) or 0 (for false).
   *
   * @param {*} value - The boolean value to serialize.
   * @returns {number} The serialized value.
   */
  serialize(value) {
    return value ? 1 : 0
  }
  /**
   * Deserializes the provided value to a boolean. 1 is deserialized to true, and anything else to false.
   *
   * @param {*} value - The value to deserialize.
   * @returns {boolean} The deserialized value.
   */
  deserialize(value) {
    return value === 1
  }
}

/**
 * Represents a numeric field.
 *
 * @class
 * @extends {BaseField}
 */
class NumberField extends BaseField {
  static aliases = ['num']
  /**
   * Validates the provided numeric value.
   *
   * @param {*} value - The value to validate.
   * @throws {Error} If the value is not a number or is NaN.
   */
  validate(value) {
    if (!_.isNumber(value) || _.isNaN(value))
      throw new Error(`Invalid type for field ${this.name}. Expected ${this.type}, got ${typeof value}`)
  }
}

/**
 * Represents an integer field.
 *
 * @class
 * @extends {NumberField}
 */
class IntegerField extends NumberField {
  static aliases = ['int']
  /**
   * Validates the provided integer value.
   *
   * @param {*} value - The value to validate.
   * @throws {Error} If the value is not an integer.
   */
  validate(value) {
    if (!_.isInteger(value))
      throw new Error(`Invalid type for field ${this.name}. Expected Integer, got ${typeof value}`)
  }
}

/**
 * Represents a floating-point number field.
 *
 * @class
 * @extends {NumberField}
 */
class FloatField extends NumberField {
  static aliases = ['decimal']
  /**
   * Serializes the provided floating-point number.
   *
   * @param {*} data - The data to serialize.
   * @returns {string} The serialized data.
   */
  serialize(data) {
    return Big(data).toString()
  }
  /**
   * Deserializes the provided string to a floating-point number.
   *
   * @param {*} data - The data to deserialize.
   * @returns {number} The deserialized data.
   */
  deserialize(data) {
    return Number(Big(data).toFixed())
  }
}

/**
 * Represents an enumeration field.
 *
 * @class
 * @extends {BaseField}
 */
class EnumField extends BaseField {
  /**
   * Creates a new instance of EnumField.
   *
   * @param {string} name - The name of the enum field.
   * @param {object} field - The field object.
   * @param {ConfigOptions} config - The configuration options for the enum field.
   */
  constructor(name, field, config) {
    super(name, field, config)
    this.values = field.values
    _.objProp(this, 'enum', field.enum)
    return _.proxyGet(this, (target, prop, receiver) => {
      if (target.values.includes(prop)) return prop
      return Reflect.get(target, prop, receiver)
    })
  }
  /**
   * Validates the provided enum value.
   *
   * @param {*} value - The value to validate.
   * @throws {Error} If the value is not a string or if it's not a valid enum value.
   */
  validate(value) {
    if (typeof value !== 'string')
      throw new Error(`Invalid type for field ${this.name}. Expected string, got ${typeof value}`)
    if (!this.enum.hasValue(value))
      throw new Error(`Invalid enum value ${value}`)
  }
  /**
   * Serializes the provided enum value.
   *
   * @param {*} value - The enum value to serialize.
   * @returns {number} The serialized value.
   */
  serialize(value) {
    return this.enum.getIndex(value)
  }
  /**
   * Deserializes the provided value to an enum value.
   *
   * @param {*} value - The value to deserialize.
   * @returns {string} The deserialized value.
   */
  deserialize(value) {
    return this.enum.getValue(value)
  }
}

/**
 * Represents a JSON field.
 *
 * @class
 * @extends {BaseField}
 */
class JsonField extends BaseField {
  static aliases = ['obj', 'object', 'arr', 'array']
  /**
   * Validates the provided JSON value.
   *
   * @param {*} value - The value to validate.
   * @throws {Error} If the value is not an object.
   */
  validate(value) {
    if (!_.isObject(value))
      throw new Error(`Invalid type for field ${this.name}. Expected Object, got ${typeof value}`)
  }
}

/**
 * Represents a buffer field.
 *
 * @class
 * @extends {BaseField}
 */
class BufferField extends BaseField {
  static aliases = ['buff', 'buf']
  /**
   * Validates the provided buffer value.
   *
   * @param {*} value - The value to validate.
   * @throws {Error} If the value is not a buffer.
   */
  validate(value) {
    if (!_.isBinary(value))
      throw new Error(`Invalid type for field ${this.name}. Expected Buffer, got ${typeof value}`)
  }
}

/**
 * Represents a foreign field.
 *
 * @class
 * @extends {BaseField}
 */
class ForeignField extends BaseField {
  /**
   * Creates a new instance of ForeignField.
   *
   * @param {string} name - The name of the foreign field.
   * @param {object} field - The field object.
   * @param {ConfigOptions} config - The configuration options for the foreign field.
   * @param {Domain} domain - The domain for the foreign field.
   * @throws {Error} If the model for the foreign field could not be found.
   */
  constructor(name, field, config, domain) {
    super(name, field, config, domain)
    const model = this.domain.getModel(this.type)
    if (!model)
      throw new Error(`Foreign model ${this.type} could not be found`)
    _.objProp(this, 'model', model)
  }
  /**
   * Validates the provided value using the model of the foreign field.
   *
   * @param {*} value - The value to validate.
   */
  validate(value) {
    this.model.validate(value)
  }
  /**
   * Serializes the provided value using the model of the foreign field.
   *
   * @param {*} value - The value to serialize.
   * @returns {*} The serialized value.
   */
  serialize(value) {
    return this.model.encode(value)
  }
  /**
   * Deserializes the provided value to a model instance of the foreign field.
   *
   * @param {*} value - The value to deserialize.
   * @returns {*} The deserialized value.
   */
  deserialize(value) {
    return this.model.decode(value)
  }
}

const fieldClasses = {
  StringField,
  BooleanField,
  NumberField,
  IntegerField,
  FloatField,
  EnumField,
  JsonField,
  BufferField,
  ForeignField,
}

module.exports = { Field, BaseField, fieldClasses, ...fieldClasses }
