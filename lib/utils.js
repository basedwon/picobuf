/**
 * Picobuf utilities.
 * This module provides a custom utility library, combining individual lodash function modules into a single object.
 * It's designed to provide the most frequently used lodash functions, while minimizing the amount of code that's needed.
 * Each function is imported from its own lodash module, which allows for efficient tree-shaking by the bundler.
 * Additionally, the module includes some custom utilities such as `isBrowser` for checking if the code is running in a browser environment.
 *
 * @see {@link https://lodash.com/docs/4.17.15|Lodash Documentation}
 */

const _ = {
  assign: require('lodash/assign'), // Assigns own enumerable string keyed properties of source objects to the destination object.
  clone: require('lodash/clone'), // Creates a shallow clone of value.
  cloneDeep: require('lodash/cloneDeep'), // Creates a deep clone of value.
  defaults: require('lodash/defaults'), // Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to undefined.
  entries: require('lodash/entries'), // Creates an array of own enumerable string keyed value pairs for object.
  get: require('lodash/get'), // Gets the value at path of object.
  set: require('lodash/set'), // Sets the value at path of object.
  unset: require('lodash/unset'), // Removes the property at path of object.
  isArray: require('lodash/isArray'), // Checks if value is classified as an Array object.
  isBoolean: require('lodash/isBoolean'), // Checks if value is classified as a boolean primitive or object.
  isBuffer: require('lodash/isBuffer'), // Checks if value is a buffer.
  isFunction: require('lodash/isFunction'), // Checks if value is classified as a Function object.
  isInteger: require('lodash/isInteger'), // Checks if value is an integer.
  isNaN: require('lodash/isNaN'), // Checks if value is NaN.
  isNil: require('lodash/isNil'), // Checks if value is null or undefined.
  isNumber: require('lodash/isNumber'), // Checks if value is classified as a Number primitive or object.
  isObject: require('lodash/isObject'), // Checks if value is the language type of Object.
  isPlainObject: require('lodash/isPlainObject'), // Checks if value is a plain object.
  isString: require('lodash/isString'), // Checks if value is classified as a String primitive or object.
  keys: require('lodash/keys'), // Creates an array of the own enumerable property names of object.
  toLower: require('lodash/toLower'), // Converts string, as a whole, to lower case.
  upperFirst: require('lodash/upperFirst'), // Converts the first character of string to upper case.
  template: require('lodash/template'), // Creates a compiled template function that can interpolate data properties in "interpolate" delimiters, HTML-escape interpolated data properties in "escape" delimiters, and execute JavaScript in "evaluate" delimiters.
  transform: require('lodash/transform'), // An alternative to _.reduce; this method transforms object.
  merge: require('lodash/merge'), // Merges objects
  values: require('lodash/values'), // Creates an array of the own enumerable string keyed property values of object.
}

_._ = _ // Stores a reference to the utility object itself

/**
 * Checks if the current execution environment is a web browser.
 * It returns true if the global `window` object is defined, false otherwise.
 *
 * @type {boolean}
 */
_.isBrowser = typeof window !== `undefined`

/**
 * @function
 * @name _.log
 * @description Log a message to the console.
 * @param {...*} args - The message or messages to log.
 */
_.log = console.log.bind(console)

/**
 * @function
 * @name _.print
 * @description Alias for _.log.
 * @param {...*} args - The message or messages to log.
 */
_.print = _.log

/**
 * @function
 * @name _.objProp
 * @description Define a property on an object with given options.
 * @param {Object} obj - The object to define a property on.
 * @param {string} key - The name of the property.
 * @param {*} value - The value of the property.
 * @param {Object} opts - The property descriptor.
 */
_.objProp = (obj, key, value, opts = {}) => {
  if (!_.isNil(opts.show)) {
    opts.enumerable = opts.show
    delete opts.show
  }
  if (!_.isNil(opts.enum)) {
    opts.enumerable = opts.enum
    delete opts.enum
  }
  if (value !== undefined) opts.value = value
  Object.defineProperty(obj, key, opts)
}

/**
 * @function
 * @name _.proxyGet
 * @description Create a Proxy with a custom getter.
 * @param {Object} obj - The object to wrap.
 * @param {Function} callback - The callback to run when getting properties.
 * @returns {Proxy} The Proxy object.
 */
_.proxyGet = (obj, callback) => new Proxy(obj, {
  get: (target, prop, receiver) => {
    if (Reflect.has(target, prop) || !_.isString(prop) || prop === 'then')
      return Reflect.get(target, prop, receiver)
    return callback(target, prop, receiver)
  },
})

/**
 * @function
 * @name _.proxyNew
 * @description Create a Proxy that can be used to instantiate the target as if it were a class.
 * @param {Function} obj - The function to wrap.
 * @returns {Proxy} The Proxy object.
 */
_.proxyNew = (obj) => new Proxy(obj, {
  apply: (target, __, args) => new target(...args),
})

/**
 * @function
 * @name _.isBinary
 * @description Check if a value is binary.
 * @param {*} value - The value to check.
 * @returns {boolean} Whether the value is binary or not.
 */
_.isBinary = (value) => _.isBrowser ? _.isArrayBuffer(value) : _.isBuffer(value)

/**
 * @function
 * @name _.toBuffer
 * @description Converts data to a buffer (or Uint8Array in a browser context).
 * @param {*} data - The data to convert.
 * @param {string} [encoding] - The encoding to use.
 * @returns {Buffer|Uint8Array} The data as a Buffer or Uint8Array.
 * @throws {Error} If the data type is unsupported.
 */
_.toBuffer = (data, encoding) => {
  if (!_.isBrowser) return Buffer.from(data, encoding)
  else if (_.isString(data))
    return new Uint8Array(_.map(data, (char) => char.charCodeAt(0)))
  else if (_.isArray(data)) return new Uint8Array(data)
  throw new Error('Unsupported data type')
}

module.exports = _
