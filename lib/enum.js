const { _, log } = require('./utils')
const { Config } = require('./config')
const { GlobalDomain } = require('./domain')

/**
 * Represents an enumeration.
 * 
 * @class
 */
class Enum {
  /**
   * Creates a new instance of Enum.
   *
   * @param {string} name - The name of the enum.
   * @param {string[]} values - The values of the enum.
   * @param {ConfigOptions} config - The configuration options for the enum.
   * @param {Domain} [domain=GlobalDomain] - The domain for the enum, defaults to GlobalDomain if none provided.
   */
  constructor(name, values, config, domain = GlobalDomain) {
    this.name = name
    this.values = values
    _.objProp(this, 'config', Config.getConfig(config))
    _.objProp(this, 'domain', domain)
    _.objProp(this, 'valueToIndex', new Map(values.map((value, index) => [value, index])))
    _.objProp(this, 'indexToValue', new Map(values.map((value, index) => [index, value])))
    _.objProp(this, 'mapping', new Map(values.map((value) => [value, value])))
    const proxy = _.proxyGet(this, (target, prop, receiver) => {
      if (!target.mapping.has(prop))
        throw new Error(`enum "${prop}" does not exist`)
      return target.mapping.get(prop)
    })
    this.domain.setEnum(this.name, proxy)
    return proxy
  }
  /**
   * Checks if a value exists in the enumeration.
   *
   * @param {*} value - The value to check.
   * @returns {boolean} True if the value exists, false otherwise.
   */
  hasValue(value) {
    return this.mapping.has(value)
  }
  /**
   * Retrieves the index of a value in the enumeration.
   *
   * @param {*} value - The value to get the index for.
   * @returns {number} The index of the value, or undefined if the value does not exist.
   */
  getIndex(value) {
    return this.valueToIndex.get(value)
  }
  /**
   * Retrieves the value at a specific index in the enumeration.
   *
   * @param {number} index - The index to get the value for.
   * @returns {*} The value at the specified index, or undefined if no value exists at that index.
   */
  getValue(index) {
    return this.indexToValue.get(index)
  }
  /**
   * Adds a new value to the enum.
   *
   * @param {*} value - The value to be added to the enum.
   * @throws {Error} If the value already exists in the enum.
   * @returns {void}
   */
  addValue(value) {
    if (this.mapping.has(value))
      throw new Error(`Value "${value}" already exists in the enum.`)
    const newIndex = this.values.length
    this.values.push(value)
    this.valueToIndex.set(value, newIndex)
    this.indexToValue.set(newIndex, value)
    this.mapping.set(value, value)
  }
}


module.exports = { Enum }
