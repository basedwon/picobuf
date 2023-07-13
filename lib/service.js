const { _, log } = require('./utils')
const { Model } = require('./model')

/**
 * Represents a Method.
 *
 * @class
 */
class Method {
  /**
   * Creates a new instance of Method.
   *
   * @param {string} name - The name of the method.
   * @param {Model} requestModel - The request model for the method.
   * @param {Model} responseModel - The response model for the method.
   */
  constructor(name, requestModel, responseModel) {
    this.name = name
    this.request = requestModel
    this.response = responseModel
  }
}

/**
 * Represents a Service.
 *
 * @class
 */
class Service {
  static Method = Method
  /**
   * Creates a new instance of Service.
   *
   * @param {string} name - The name of the service.
   * @param {Object} definition - The definition of the service.
   * @param {Domain} [domain=GlobalDomain] - The domain of the service.
   */
  constructor(name, definition, domain = GlobalDomain) {
    this.name = name
    _.objProp(this, 'domain', domain)
    this.methods = new Map()
    if (definition)
      for (const [methodName, opts] of _.entries(definition))
        this.createMethod(methodName, opts.request, opts.response, opts.domain)
    return _.proxyGet(this, (target, prop, receiver) => {
      if (target.methods.has(prop))
        return target.methods.get(prop)
      return Reflect.get(target, prop, receiver)
    })
  }
  /**
   * Creates a new method within the Service.
   *
   * @param {string} name - The name of the method.
   * @param {Model|string|object} requestModel - The request model for the method. Can be a Model instance, model name string or model definition object.
   * @param {Model|string|object} responseModel - The response model for the method. Can be a Model instance, model name string or model definition object.
   * @param {Domain} [domain=this.domain] - The domain for the method. Defaults to the Service's domain.
   * @returns {Method} The created method.
   */
  createMethod(name, requestModel, responseModel, domain) {
    domain = domain || this.domain
    requestModel = this._getModel(`${this.name}.${name}.request`, requestModel, domain)
    responseModel = this._getModel(`${this.name}.${name}.response`, responseModel, domain)
    const method = new Method(name, requestModel, responseModel)
    this.methods.set(name, method)
    return method
  }
  /**
   * Internal method used to get a model based on various input types.
   * 
   * @param {string} name - The name for the model if it needs to be created.
   * @param {Model|string|object} model - The model to get. Can be a Model instance, model name string, or model definition object.
   * @param {Domain} domain - The domain in which to look for or create the model.
   * @returns {Model} The resulting model.
   * @throws {Error} Throws an error if the input model is not a string, Model instance, or object definition.
   * @private
   */
  _getModel(name, model, domain) {
    if (typeof model === 'string') {
      model = domain.getModel(model)
    } else if (model instanceof Model) {
      if (!domain.getModel(model.name))
        domain.createModel(model.name, model.fields, Model)
    } else if (typeof model === 'object') {
      model = domain.createModel(name, model, config, Model)
    } else
      throw new Error('Invalid model input. Must be a string, Model instance, or object definition.')
    return model
  }
  /**
   * Retrieves a method from the Service by its name.
   *
   * @param {string} name - The name of the method.
   * @returns {Method|null} The retrieved method or null if not found.
   */
  getMethod(name) {
    return this.methods.get(name)
  }
}

module.exports = { Service, Method }
