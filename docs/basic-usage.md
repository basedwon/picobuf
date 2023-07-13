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
const { User } = new Picobuf({ User: { name: 'string' }})
const user = User.create({ name: 'Alice' })
const encoded = User.encode(user)
const decoded = User.decode(encoded)
User.validate(decoded)
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
