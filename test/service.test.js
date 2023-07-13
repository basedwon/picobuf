// test/service.test.js

const Picobuf = require('../lib/picobuf')
const { Service, Method } = require('../lib/service')

describe('Service', () => {
  it('should create a service with methods', () => {
    const pb = new Picobuf()
    const TestModel = pb.createModel('TestModel', {
      field: 'string'
    })
    const TestService = pb.createService('TestService', {
      method1: {
        request: TestModel,
        response: TestModel
      },
      method2: {
        request: TestModel,
        response: TestModel
      }
    })
    expect(TestService.method1).to.be.an.instanceOf(Method)
    expect(TestService.method2).to.be.an.instanceOf(Method)
  })

  it('should validate the request and response models of a method', () => {
    const pb = new Picobuf()
    const TestModel = pb.createModel('TestModel', {
      field: 'string'
    })
    const TestService = pb.createService('TestService', {
      method1: {
        request: TestModel,
        response: TestModel
      },
      // Invalid request, should throw an error
      method2: {
        request: 'InvalidModel',
        response: TestModel
      },
      // Invalid response, should throw an error
      method3: {
        request: TestModel,
        response: 'InvalidModel'
      }
    })

    expect(() => TestService.method1.request.encode({ field: 'value' })).to.not.throw()
    expect(() => TestService.method1.response.encode({ field: 'value' })).to.not.throw()

    expect(TestService.method2.request).to.be.undefined
    expect(() => TestService.method2.response.encode({ field: 'value' })).to.not.throw()

    expect(() => TestService.method3.request.encode({ field: 'value' })).to.not.throw()
    expect(TestService.method3.response).to.be.undefined
  })

  it('should encode and decode with the request model', () => {
    const pb = new Picobuf()
    const TestModel = pb.createModel('TestModel', {
      field: 'string'
    })
    const TestService = pb.createService('TestService', {
      method1: {
        request: TestModel,
        response: TestModel
      },
    })
    const data = { field: 'value' }
    const encoded = TestService.method1.request.encode(data)
    expect(encoded).to.be.instanceof(Buffer)
    const decoded = TestService.method1.request.decode(encoded)
    expect(decoded).to.deep.equal(data)
  })
  it('should encode and decode with the response model', () => {
    const pb = new Picobuf()
    const TestModel = pb.createModel('TestModel', {
      field: 'string'
    })
    const TestService = pb.createService('TestService', {
      method1: {
        request: TestModel,
        response: TestModel
      },
    })
    const data = { field: 'value' }
    const encoded = TestService.method1.response.encode(data)
    expect(encoded).to.be.instanceof(Buffer)
    const decoded = TestService.method1.response.decode(encoded)
    expect(decoded).to.deep.equal(data)
  })
})
