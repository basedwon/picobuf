const { Enum, Config, Domain } = require('../lib/picobuf')

describe('Enum', () => {
  it('should create an enum with values', () => {
    const enumInstance = new Enum('TestEnum', ['VALUE1', 'VALUE2', 'VALUE3'])
    expect(enumInstance.VALUE1).to.equal('VALUE1')
    expect(enumInstance.VALUE2).to.equal('VALUE2')
    expect(enumInstance.VALUE3).to.equal('VALUE3')
  })

  it('should create an enum with values and config', () => {
    const config = new Config({ objectMode: true })
    const enumInstance = new Enum('TestEnum', ['VALUE1', 'VALUE2', 'VALUE3'], config)
    expect(enumInstance.VALUE1).to.equal('VALUE1')
    expect(enumInstance.VALUE2).to.equal('VALUE2')
    expect(enumInstance.VALUE3).to.equal('VALUE3')
  })

  it('should create an enum with values and domain', () => {
    const domain = new Domain()
    const enumInstance = new Enum('TestEnum', ['VALUE1', 'VALUE2', 'VALUE3'], null, domain)
    expect(enumInstance.VALUE1).to.equal('VALUE1')
    expect(enumInstance.VALUE2).to.equal('VALUE2')
    expect(enumInstance.VALUE3).to.equal('VALUE3')
    expect(domain.enums.size).to.equal(1)
    expect(domain.getEnum('TestEnum')).to.exist
  })

  it('should create an enum with values, config, and domain', () => {
    const config = new Config({ objectMode: true })
    const domain = new Domain()
    const enumInstance = new Enum('TestEnum', ['VALUE1', 'VALUE2', 'VALUE3'], config, domain)
    expect(enumInstance.VALUE1).to.equal('VALUE1')
    expect(enumInstance.VALUE2).to.equal('VALUE2')
    expect(enumInstance.VALUE3).to.equal('VALUE3')
    expect(domain.enums.size).to.equal(1)
    expect(domain.getEnum('TestEnum')).to.exist
  })

  it('should get the index of a value', () => {
    const enumInstance = new Enum('TestEnum', ['VALUE1', 'VALUE2', 'VALUE3'])
    expect(enumInstance.getIndex('VALUE1')).to.equal(0)
    expect(enumInstance.getIndex('VALUE2')).to.equal(1)
    expect(enumInstance.getIndex('VALUE3')).to.equal(2)
  })

  it('should get the value of an index', () => {
    const enumInstance = new Enum('TestEnum', ['VALUE1', 'VALUE2', 'VALUE3'])
    expect(enumInstance.getValue(0)).to.equal('VALUE1')
    expect(enumInstance.getValue(1)).to.equal('VALUE2')
    expect(enumInstance.getValue(2)).to.equal('VALUE3')
  })

  it('should throw an error for an invalid value', () => {
    const enumInstance = new Enum('TestEnum', ['VALUE1', 'VALUE2', 'VALUE3'])
    expect(() => enumInstance.INVALID_VALUE).to.throw('enum "INVALID_VALUE" does not exist')
  })
})
