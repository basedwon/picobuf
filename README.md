# Picobuf

[![npm](https://img.shields.io/npm/v/picobuf?style=flat&logo=npm)](https://www.npmjs.com/package/picobuf)
[![pipeline](https://gitlab.com/basedwon/picobuf/badges/master/pipeline.svg)](https://gitlab.com/basedwon/picobuf/-/pipelines)
[![license](https://img.shields.io/npm/l/picobuf)](https://gitlab.com/basedwon/picobuf/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/picobuf)](https://www.npmjs.com/package/picobuf) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/basedwon/picobuf)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/picobuf)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

Picobuf is a powerful and flexible library for working with Protocol Buffers in JavaScript. It makes it easy to define models, enums, and services, and provides an intuitive API for encoding and decoding messages. Check out the [documentation](#documentation) to learn more.

## Features

- **Versatile Data Modeling**: Define your data structures using simple or composite fields, with support for lists and foreign keys.
- **Encoding**: Built-in support for MsgPack and JSON, or bring your own encoder.
- **Object Mode**: Or don't encode the data, rather use Picobuf just for data validation.
- **Validation**: Rest easy knowing all of your nested data meets the defined model's schema.
- **Data types as God intended**: String, Boolean, Number, Integer, Float, JSON, Buffer and Foreign relations
- **Enums**: Tightly manage your data with enumerated fields, ensuring data integrity and simplifying validation.
- **Service Methods**: Define arbitrary service methods and decouple your data models from the rest of your application.
- **Isomorphic**: Picobuf works in both Node.js and the browser.
- **Extendable**: Expand your possibilities with custom field types and validation rules.

## Installation

Install the package with:

```bash
npm install picobuf
```

## Usage

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

## Documentation

- [Basic Usage](/docs/basic-usage.md)
- [Advanced Usage](/docs/advanced-usage.md)
- [API Reference](/docs/api.md)
- [Class Diagram](/docs/class-diagram.md)

<img src="/docs/class-diagram.png" alt="Picobuf class diagram" height="260" />

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/basedwon/picobuf.git
cd picobuf
npm install
```

To run the tests:

```bash
npm test
```

Testing in the browser:

*coming soon...*

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## License

Picobuf is [MIT licensed](https://gitlab.com/basedwon/picobuf/-/blob/master/LICENSE).
