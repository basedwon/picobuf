const { _, log } = require('./utils')
const Picobuf = require('./picobuf')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const util = require('util')
_.print = (obj, showHidden) => _.log(util.inspect(obj, { depth: null, colors: true, showHidden }))

/**
 * Represents the PicobufNode class, which extends Picobuf.
 *
 * @class
 * @extends {Picobuf}
 */
class PicobufNode extends Picobuf {
  /**
   * Provides a Proxy for instantiating new PicobufNode objects.
   * 
   * @static
   * @type {Function}
   */
  static Picobuf = _.proxyNew(PicobufNode)
  /**
   * Creates a new instance of PicobufNode.
   *
   * @param {object} options - The options for the PicobufNode.
   * @param {ConfigOptions} config - The configuration options for the PicobufNode.
   * @param {Domain} domain - The domain for the PicobufNode.
   */
  constructor(options, config, domain) {
    super(options, config, domain)
    this.config.setDefault({ defaultLoader: 'json' })
  }
  /**
   * Loads configuration data for the PicobufNode.
   *
   * @param {object|string} options - The options to load. If a string is passed, it is treated as a file path to load configuration from.
   * @param {Function|string} [loader] - The loader to use for loading the configuration. If a string is passed, it is used to find a default loader function. If not provided, the loader will be determined based on the file extension.
   * @throws {Error} Throws an error if an invalid loader is provided or if the options cannot be parsed.
   * @returns {PicobufNode} The PicobufNode instance.
   */
  load(options, loader) {
    if (_.isNil(options)) return this
    if (_.isString(options)) {
      loader = loader || this.config.get('loader')
      if (!loader) {
        if (options.endsWith('.json'))
          loader = 'json'
        else if (options.match(/\.(yaml|yml)$/))
          loader = 'yaml'
      }
      if (_.isString(loader))
        loader = { json: JSON.parse, yaml: yaml.load }[loader]
      if (!_.isFunction(loader))
        throw new Error(`Invalid options loader`)
      const fileContent = fs.readFileSync(options, 'utf8')
      try {
        options = loader(fileContent)
      } catch (error) {
        throw new Error(`Loader parsing error: ${error.message}`)
      }
    }
    if (!_.isPlainObject(options))
      throw new Error(`Invalid load options`)
    return super.load(options)
  }
}


module.exports = PicobufNode.Picobuf
