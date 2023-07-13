const { _, log } = require('./utils')
const { Config, GlobalConfig } = require('./config')
const { GlobalDomain, Domain } = require('./domain')
const { Service } = require('./service')
const { Model } = require('./model')
const { Enum } = require('./enum')

/**
 * Represents the main class for the Picobuf library.
 * 
 * Picobuf can be instantiated in two ways: using the `new` keyword or calling `Picobuf` as a function. Both methods are equivalent.
 * The constructor can receive an optional `definitions` parameter, which is an object that can include model, enum, and service definitions.
 * Alternatively, these elements can be defined after instantiation, using the relevant methods.
 * 
 * A Picobuf instance is a Proxy object, so it allows destructuring of models, enums, and services directly from the instance.
 * 
 * @class
 * @classdesc This is the main class for the Picobuf library.
 * @module Picobuf
 */
class Picobuf {
  static Picobuf = _.proxyNew(Picobuf)
  static Model = Model
  static Enum = Enum
  static Config = Config
  static GlobalConfig = GlobalConfig
  static Service = Service
  static Domain = Domain
  static GlobalDomain = GlobalDomain
  /**
   * Creates a new instance of Picobuf.
   *
   * @param {object} [options] - Optional options to configure the Picobuf instance.
   * @param {object} [options.models] - An object where keys are model names and values are model definitions.
   * @param {object} [options.enums] - An object where keys are enum names and values are enum definitions.
   * @param {object} [options.services] - An object where keys are service names and values are service definitions.
   * @param {Config} config - The configuration options for the Picobuf.
   * @param {Domain} domain - The domain for the Picobuf.
   * @throws {Error} If the options are not valid or if the loading from file is attempted outside Node.js environment.
   */
  constructor(options, config, domain) {
    _.objProp(this, 'Config', config?.Config || this.constructor.Config)
    _.objProp(this, 'config', Config.set(config))
    _.objProp(this, 'Enum', this.config.Enum || this.constructor.Enum)
    _.objProp(this, 'Model', this.config.Model || this.constructor.Model)
    _.objProp(this, 'Service', this.config.Service || this.constructor.Service)
    this.domain = domain || GlobalDomain
    this.services = new Map()
    this.load(options)
    return _.proxyGet(this, (target, prop, receiver) => {
      const str = _.toLower(prop)
      const model = target.getModel(str)
      if (model) return model
      const enumInstance = target.getEnum(str)
      if (enumInstance) return enumInstance
      const service = target.getService(str)
      if (service) return service
      return Reflect.get(target, prop, receiver)
    })
  }
  /**
   * Loads the provided options into the Picobuf.
   *
   * @param {Object} options - The options to load.
   */
  load(options) {
    if (_.isNil(options)) return
    if (_.isString(options))
      throw new Error('File loading is only available in the Node.js version')
    if (!_.isPlainObject(options))
      throw new Error(`Invalid load options`)
    if (!options.models) options = { models: options }
    options = _.merge({ models: {}, enums: {}, services: {} }, options)
    this.createEnums(options.enums)
    this.createModels(options.models)
    this.createServices(options.services)
  }
  /**
   * Sets the domain for the Picobuf.
   *
   * @param {Domain} domain - The domain to set.
   */
  setDomain(domain) {
    this.domain = domain
  }
  /**
   * Creates a new model in the Picobuf domain.
   *
   * @param {string} name - The name of the model.
   * @param {Object} fields - The fields for the model.
   * @param {ConfigOptions} config - The configuration options for the model.
   * @param {Model} [modelClass=Model] - The class for the model.
   * @returns {Model} The created model.
   */
  createModel(name, fields, config, modelClass) {
    return this.domain.createModel(name, fields, config || this.config, modelClass || Model)
  }
  /**
   * Creates multiple models in the Picobuf domain.
   *
   * @param {Object} models - An object mapping names to fields for each model.
   */
  createModels(models) {
    for (const [key, value] of _.entries(models))
      this.createModel(key, value)
  }
  /**
   * Retrieves a model from the Picobuf domain by its name.
   *
   * @param {string} name - The name of the model.
   * @returns {Model|undefined} The retrieved model or undefined if the model does not exist.
   */
  getModel(name) {
    return this.domain.getModel(name)
  }
  /**
   * Creates a new enum in the Picobuf domain.
   *
   * @param {string} name - The name of the enum.
   * @param {string[]} values - The values for the enum.
   * @param {ConfigOptions} config - The configuration options for the enum.
   * @param {Enum} [enumClass=Enum] - The class for the enum.
   * @returns {Enum} The created enum.
   */
  createEnum(name, values, config, enumClass) {
    return this.domain.createEnum(name, values, config || this.config, enumClass || Enum)
  }
  /**
   * Creates multiple enums in the Picobuf domain.
   *
   * @param {Object} enums - An object mapping names to values for each enum.
   */
  createEnums(enums) {
    for (const [key, value] of _.entries(enums))
      this.createEnum(key, value)
  }
  /**
   * Retrieves an enum from the Picobuf domain by its name.
   *
   * @param {string} name - The name of the enum.
   * @returns {Enum|undefined} The retrieved enum or undefined if the enum does not exist.
   */
  getEnum(name) {
    return this.domain.getEnum(name)
  }
  /**
   * Creates a new service in the Picobuf domain.
   *
   * @param {string} name - The name of the service.
   * @param {Object} definition - The definition for the service.
   * @returns {Service} The created service.
   */
  createService(name, definition) {
    const service = new Service(name, definition, this.domain)
    this.services.set(name, service)
    return service
  }
  /**
   * Creates multiple services in the Picobuf domain.
   *
   * @param {Object} services - An object mapping names to definitions for each service.
   */
  createServices(services) {
    for (const [key, value] of _.entries(services))
      this.createService(key, value)
  }
  /**
   * Retrieves a service from the Picobuf domain by its name.
   *
   * @param {string} name - The name of the service.
   * @returns {Service|undefined} The retrieved service or undefined if the service does not exist.
   */
  getService(name) {
    return this.services.get(name)
  }
  /**
   * Sets the Config for the Picobuf class.
   *
   * @param {ConfigOptions} newConfig - The new configuration options for the Picobuf class.
   */
  static set(newConfig) {
    this.Config.set(newConfig)
  }
}

module.exports = Picobuf.Picobuf
