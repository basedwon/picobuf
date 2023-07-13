# Advanced Usage

## Models

Picobuf allows you to define models using the `Model` class. A model represents a Protocol Buffers message, and consists of fields and a set of encoding and decoding methods. Here is an example of defining a simple model:

```javascript
const { Model } = Picobuf

// Define a Person model
const Person = new Model('Person', {
  name: 'string',
  age: 'int32',
})
```

In the example above, we define a `Person` model with two fields: `name`, which is a string, and `age`, which is a 32-bit integer. Once a model is defined, you can use it to create and encode messages:

```javascript
// Create a new Person message
const person = Person.create({
  name: 'John Doe',
  age: 25,
})

// Encode the person message
const encodedPerson = Person.encode(person)

console.log(encodedPerson)
```

## Enums

Picobuf also supports enums using the `Enum` class. Enums represent a set of named values. Here is an example:

```javascript
const { Enum } = Picobuf

// Define a Color enum
const Color = new Enum('Color', {
  RED: 1,
  GREEN: 2,
  BLUE: 3,
})
```

In the example above, we define a `Color` enum with three values: `RED`, `GREEN`, and `BLUE`. Enums can be used as fields in models.

## Services

In addition to models and enums, Picobuf also supports services using the `Service` class. Services allow you to define RPC methods that can be called remotely. Here is an example:

```javascript
const { Service } = Picobuf

// Define a GreetingService service
const GreetingService = new Service('GreetingService', {
  sayHello: {
    request: 'HelloRequest',
    response: 'HelloResponse',
  },
})
```

In the example above, we define a `GreetingService` with a `sayHello` method. The `sayHello` method takes a `HelloRequest` message as input and returns a `HelloResponse` message.

## Config

Picobuf provides a `Config` class that allows you to configure various options. You can set default options for all instances of Picobuf or change options for individual instances. Here is an example:

```javascript
const { Config } = Picobuf

// Set default options for all instances of Picobuf
Config.set({
  defaultEncoder: 'msgpack',
})

// Create a new instance of Picobuf with custom options
const pb = new Picobuf({
  defaultEncoder: 'json',
})
```

In the example above, we set the default encoder to `msgpack` for all instances of Picobuf. Then, we create a new instance of Picobuf with a custom option to use the `json` encoder.
