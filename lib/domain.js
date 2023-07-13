const { _, log } = require('./utils')
const { GlobalConfig } = require('./config')

/**
 * Represents a Domain.
 *
 * @class
 */
class Domain {
  /**
   * Creates a new instance of Domain.
   * This class provides methods to manage models and enums.
   * @type Domain
   * @param {Config} config - A Config instance.
   */
  constructor(config) {
    _.objProp(this, 'config', config)
    this.models = new Map()
    this.enums = new Map()
  }
  /**
   * Creates a new Model instance.
   *
   * @param {string} name - The name of the model.
   * @param {object} fields - The fields for the model.
   * @param {Config} config - A Config instance for the model.
   * @param {Function} modelClass - The constructor of the model class.
   * @returns {object} The newly created model instance.
   */
  createModel(name, fields, config, modelClass) {
    const model = new modelClass(name, fields, config || this.config, this)
    this.models.set(_.toLower(name), model)
    return model
  }
  /**
   * Sets a Model in the Domain.
   *
   * @param {string} name - The name of the model.
   * @param {object} model - The model instance to be set.
   */
  setModel(name, model) {
    return this.models.set(_.toLower(name), model)
  }
  /**
   * Gets a Model from the Domain.
   *
   * @param {string} name - The name of the model.
   * @returns {object|null} The requested model, if found. Otherwise, returns null.
   */
  getModel(name) {
    return this.models.get(_.toLower(name))
  }
  /**
   * Creates a new Enum instance.
   *
   * @param {string} name - The name of the enum.
   * @param {string[]} values - The values for the enum.
   * @param {Config} config - A Config instance for the enum.
   * @param {Function} enumClass - The constructor of the enum class.
   * @returns {object} The newly created enum instance.
   */
  createEnum(name, values, config, enumClass) {
    const enumInstance = new enumClass(name, values, config || this.config, this)
    this.enums.set(_.toLower(name), enumInstance)
    return enumInstance
  }
  /**
   * Gets an Enum from the Domain.
   *
   * @param {string} name - The name of the enum.
   * @returns {object|null} The requested enum, if found. Otherwise, returns null.
   */
  getEnum(name) {
    return this.enums.get(_.toLower(name))
  }
  /**
   * Sets an Enum in the Domain.
   *
   * @param {string} name - The name of the enum.
   * @param {object} enumInstance - The enum instance to be set.
   */
  setEnum(name, enumInstance) {
    return this.enums.set(_.toLower(name), enumInstance)
  }
}

/**
 * The global domain instance.
 * @type {Domain}
 */
const GlobalDomain = new Domain(GlobalConfig)

module.exports = { Domain, GlobalDomain }
