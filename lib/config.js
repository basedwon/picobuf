const CONSTANTS = require('./const')
const { _, log } = require('./utils')
const { fieldClasses } = require('./field')
const { encoderClasses } = require('./encoder')

/**
 * Default configuration values.
 *
 * @type {Object}
 * @property {boolean} objectMode - Default object mode. Defaults to `CONSTANTS.DEFAULT_OBJECT_MODE`.
 * @property {boolean} strict - Whether to use strict mode. Defaults to `CONSTANTS.DEFAULT_STRICT`.
 * @property {string} defaultFieldType - The default field type. Defaults to `CONSTANTS.DEFAULT_FIELD_TYPE`.
 * @property {string} defaultEncoder - The default encoder. Defaults to `CONSTANTS.DEFAULT_ENCODER`.
 * @property {boolean} singleProp - Whether to use single property mode. Defaults to `CONSTANTS.SINGLE_PROP`.
 * @property {Object} fieldClasses - The field classes.
 * @property {Object} encoderClasses - The encoder classes.
 */
const DEFAULT_CONFIG = {
  objectMode: CONSTANTS.DEFAULT_OBJECT_MODE,
  strict: CONSTANTS.DEFAULT_STRICT,
  defaultFieldType: CONSTANTS.DEFAULT_FIELD_TYPE,
  defaultEncoder: CONSTANTS.DEFAULT_ENCODER,
  singleProp: CONSTANTS.SINGLE_PROP,
  fieldClasses,
  encoderClasses,
}

/**
 * Represents the Config class that handles configuration for the application.
 *
 * @type Config
 * @class
 */
class Config {
  /**
   * The default configuration.
   *
   * @static
   * @type {Object}
   */
  static defaults = DEFAULT_CONFIG
  /**
   * Creates a new Config instance.
   *
   * @param {Object} initialConfig - The initial configuration.
   */
  constructor(initialConfig) {
    this.config = _.merge({}, this.constructor.defaults, initialConfig)
  }
  /**
   * Updates the current configuration.
   *
   * @param {Object} newConfig - The new configuration.
   */
  setConfig(newConfig) {
    this.config = _.merge(this.config, newConfig)
  }
  /**
   * Merges the default configuration into the current configuration.
   *
   * @param {Object} defaultConfig - The default configuration.
   */
  setDefault(defaultConfig) {
    this.config = _.merge(this.config, defaultConfig, this.config)
  }
  /**
   * Gets the value of a key from the configuration.
   *
   * @param {string} key - The key.
   * @param {any} [defaultValue=null] - The default value if key is not found.
   * @returns {any} The value.
   */
  get(key, defaultValue = null) {
    return _.get(this.config, key, defaultValue)
  }
  /**
   * Gets the current configuration.
   *
   * @returns {Object} The current configuration.
   */
  getConfig() {
    return this.config
  }
  /**
   * Returns an instance of Config based on the passed config parameter.
   *
   * @static
   * @param {Config|Object} config - The config object.
   * @returns {Config} The instance of Config.
   */
  static get(config) {
    if (_.isPlainObject(config))
      config = new Config(config)
    if (!(config instanceof Config))
      config = GlobalConfig
    return config
  }
  /**
   * Updates the global configuration.
   *
   * @static
   * @param {Object} newConfig - The new configuration.
   * @returns {Config} The updated global configuration.
   */
  static set(newConfig) {
    GlobalConfig.setConfig(newConfig)
    return GlobalConfig
  }
  /**
   * Returns the configuration object of a Config instance or default config.
   *
   * @static
   * @param {Config|Object} config - The config object.
   * @returns {Object} The configuration object.
   */
  static getConfig(config) {
    return this.get(config).getConfig()
  }
  /**
   * Merges new configuration with default configuration.
   *
   * @static
   * @param {Object} newConfig - The new configuration.
   */
  static setConfig(newConfig) {
    _.merge(this.defaults, newConfig)
  }
}

/**
 * The global configuration instance.
 * @type {Config}
 */
const GlobalConfig = new Config()

module.exports = { Config, GlobalConfig }
