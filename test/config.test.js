const { Enum, GlobalDomain, Config, GlobalConfig } = require('../lib/picobuf-n')

function omit(config) {
  return _.omit(config, ['fieldClasses', 'encoderClasses'])
}

describe('Config', () => {
  describe('defaults', () => {
    it('should have the default configuration values', () => {
      const defaults = {
        objectMode: false,
        strict: true,
        defaultFieldType: 'string',
        defaultEncoder: 'msgpack',
        singleProp: 'fieldType'
      }
      expect(omit(Config.defaults)).to.deep.equal(defaults)
    })
  })

  describe('constructor', () => {
    it('should merge the initial config with the default config', () => {
      const initialConfig = {
        objectMode: false,
        defaultFieldType: 'number'
      }
      const config = new Config(initialConfig)
      expect(omit(config.getConfig())).to.deep.equal({
        objectMode: false,
        strict: true,
        defaultFieldType: 'number',
        defaultEncoder: 'msgpack',
        singleProp: 'fieldType'
      })
    })
  })

  describe('setConfig', () => {
    it('should set a new config', () => {
      const config = new Config()
      const newConfig = {
        objectMode: false,
        defaultFieldType: 'number'
      }
      config.setConfig(newConfig)
      expect(omit(config.getConfig())).to.deep.equal({
        objectMode: false,
        strict: true,
        defaultFieldType: 'number',
        defaultEncoder: 'msgpack',
        singleProp: 'fieldType'
      })
    })
  })

  describeOmit('setDefault', () => {
    it('should merge the default config with the existing config', () => {
      const config = new Config({
        objectMode: false,
        defaultFieldType: 'number'
      })
      const defaultConfig = {
        objectMode: true,
        defaultFieldType: 'string',
        defaultEncoder: 'msgpack'
      }
      config.setDefault(defaultConfig)
      expect(omit(config.getConfig())).to.deep.equal({
        objectMode: true,
        strict: true,
        defaultFieldType: 'number',
        defaultEncoder: 'msgpack',
        singleProp: 'fieldType'
      })
    })
  })

  describe('get', () => {
    it('should return the global config if no config is provided', () => {
      expect(Config.get()).to.equal(GlobalConfig)
    })

    it('should return a new config instance if a plain object is provided', () => {
      const config = Config.get({ objectMode: true })
      expect(config).to.be.an.instanceOf(Config)
      expect(config.getConfig().objectMode).to.be.true
    })

    it('should return the provided config instance if it is already an instance of Config', () => {
      const config = new Config({ objectMode: false })
      expect(Config.get(config)).to.equal(config)
    })
  })

  describe('getConfig', () => {
    it('should return the config object', () => {
      const config = new Config()
      expect(config.getConfig()).to.deep.equal(Config.defaults)
    })
  })

  describe('set', () => {
    it('should set the global config', () => {
      const newConfig = {
        strict: false,
        defaultEncoder: 'none'
      }
      Config.set(newConfig)
      expect(Config.getConfig().strict).to.be.false
      expect(Config.getConfig().defaultEncoder).to.equal('none')
      // set it back
      Config.set({ strict: true, defaultEncoder: 'msgpack' })
    })
  })

  describe('static getConfig', () => {
    it('should return the global config', () => {
      expect(Config.getConfig()).to.deep.equal(GlobalConfig.getConfig())
    })
  })
})
