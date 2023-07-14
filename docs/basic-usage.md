# Basic Usage

First, import the `Picobuf` library.

```js
import Picobuf from 'picobuf'
```
or
```js
const Picobuf = require('picobuf')
```

Then define your models, enums or services.

```js
// create a picobuf instance
const picobuf = new Picobuf({ User: { name: 'string' }})

// or destructure the named model
const { User } = new Picobuf({ User: { name: 'string' }})

// create an instance of the model
const user = User.create({ name: 'Alice' })

// validate this data (throws an error if invalid)
User.validate(user)

// encode
const encoded = User.encode(user)

// decode
const decoded = User.decode(encoded)

// Enums
const { Types } = new Picobuf({ enums: { Types: { values: ['SEN', 'ACK'] }}})
// or
const Types = pb.createEnum('Types', ['SEN', 'ACK'])

console.log(Types.SEN) // => 'SEN'
console.log(Types.getIndex('SEN')) // => 0
// incorrect enum will throw an error
console.log(Types.SEND) // => Invalid enum "SEND"

// Services
const { echo } = new Picobuf({ services: {
  echo: {
    ping: { // echo.ping service method
      request: 'User', // string reference to model
      response: User, // direct use of model instance
    }
  }
}})
const data = { name: 'Bob' }
const encoded = echo.ping.request.encode(data)
const decoded = echo.ping.request.decode(encoded)
```

Then, create an instance of `Picobuf` and load your configuration.

```js
const picobuf = new Picobuf()

// Using an object for configuration
picobuf.load({
  enums: { ... },
  models: { ... },
  services: { ... },
})
```

In Node.js, you can also load a configuration from a JSON or YAML file:

```js
const picobuf = new Picobuf()
picobuf.load('./path/to/your/config.json')
```

And the constructor will load configuration as well:

```js
const picobuf = new Picobuf('./path/to/your/config.yml')
```

**Relationships**

```js
const { User, Pet } = new Picobuf({
  pet: { name: 'string' },
  user: { name: 'string', pet: 'pet' }
})
const pet = Pet.create({ name: 'Spot' })
const user = User.create({ name: 'Alice', pet })
const encoded = User.encode(user)
const decoded = User.decode(encoded)
```
