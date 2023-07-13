const { _, log } = require('./utils')
const msgpack = require('msgpack-lite')

/**
 * Represents a base encoder.
 *
 * @class
 */
class BaseEncoder {
  /**
   * Creates a new instance of BaseEncoder.
   *
   * @param {Model} model - The model that the encoder will operate on.
   * @throws {TypeError} - If a new instance of BaseEncoder is attempted to be created directly.
   */
  constructor(model) {
    if (new.target === BaseEncoder)
      throw new TypeError('Cannot construct BaseEncoder instances directly')
    _.objProp(this, 'model', model)
  }
  /**
   * Method stub for encoding data.
   * 
   * @param {*} data - The data to encode.
   * @throws {Error} - If the method is not implemented.
   */
  encode(data) {
    throw new Error('encode method not implemented')
  }
  /**
   * Method stub for decoding data.
   * 
   * @param {*} data - The data to decode.
   * @throws {Error} - If the method is not implemented.
   */
  decode(data) {
    throw new Error('decode method not implemented')
  }
}

/**
 * Represents a NoneEncoder.
 *
 * @class
 * @extends BaseEncoder
 */
class NoneEncoder extends BaseEncoder {
  /**
   * Encodes the data by returning it unchanged.
   *
   * @param {*} data - The data to encode.
   * @returns {*} - The unchanged data.
   */
  encode(data) {
    return data
  }
  /**
   * Decodes the data by returning it unchanged.
   *
   * @param {*} data - The data to decode.
   * @returns {*} - The unchanged data.
   */
  decode(data) {
    return data
  }
}

/**
 * Represents a MsgPackEncoder.
 *
 * @class
 * @extends BaseEncoder
 */
class MsgPackEncoder extends BaseEncoder {
  /**
   * Encodes the data using msgpack.
   *
   * @param {*} data - The data to encode.
   * @returns {*} - The encoded data.
   */
  encode(data) {
    return msgpack.encode(data)
  }
  /**
   * Decodes the data using msgpack.
   *
   * @param {*} data - The data to decode.
   * @returns {*} - The decoded data.
   */
  decode(data) {
    return msgpack.decode(data)
  }
}

const encoderClasses = { NoneEncoder, MsgPackEncoder }

module.exports = { BaseEncoder, encoderClasses, ...encoderClasses }
