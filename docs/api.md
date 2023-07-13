## Modules

<dl>
<dt><a href="#module_Picobuf">Picobuf</a></dt>
<dd><p>Represents the main class for the Picobuf library.</p>
<p>Picobuf can be instantiated in two ways: using the <code>new</code> keyword or calling <code>Picobuf</code> as a function. Both methods are equivalent.
The constructor can receive an optional <code>definitions</code> parameter, which is an object that can include model, enum, and service definitions.
Alternatively, these elements can be defined after instantiation, using the relevant methods.</p>
<p>A Picobuf instance is a Proxy object, so it allows destructuring of models, enums, and services directly from the instance.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Config">Config</a> : <code><a href="#Config">Config</a></code></dt>
<dd><p>Represents the Config class that handles configuration for the application.</p>
</dd>
<dt><a href="#Domain">Domain</a> : <code><a href="#Domain">Domain</a></code></dt>
<dd><p>Represents a Domain.</p>
</dd>
<dt><a href="#BaseEncoder">BaseEncoder</a></dt>
<dd><p>Represents a base encoder.</p>
</dd>
<dt><a href="#NoneEncoder">NoneEncoder</a> ⇐ <code><a href="#BaseEncoder">BaseEncoder</a></code></dt>
<dd><p>Represents a NoneEncoder.</p>
</dd>
<dt><a href="#MsgPackEncoder">MsgPackEncoder</a> ⇐ <code><a href="#BaseEncoder">BaseEncoder</a></code></dt>
<dd><p>Represents a MsgPackEncoder.</p>
</dd>
<dt><a href="#Enum">Enum</a></dt>
<dd><p>Represents an enumeration.</p>
</dd>
<dt><a href="#Field">Field</a></dt>
<dd><p>Represents a Field.</p>
</dd>
<dt><a href="#BaseField">BaseField</a></dt>
<dd><p>Represents a base field. This is an abstract base class and cannot be instantiated directly.</p>
</dd>
<dt><a href="#StringField">StringField</a> ⇐ <code><a href="#BaseField">BaseField</a></code></dt>
<dd><p>Represents a string field.</p>
</dd>
<dt><a href="#BooleanField">BooleanField</a> ⇐ <code><a href="#BaseField">BaseField</a></code></dt>
<dd><p>Represents a boolean field.</p>
</dd>
<dt><a href="#NumberField">NumberField</a> ⇐ <code><a href="#BaseField">BaseField</a></code></dt>
<dd><p>Represents a numeric field.</p>
</dd>
<dt><a href="#IntegerField">IntegerField</a> ⇐ <code><a href="#NumberField">NumberField</a></code></dt>
<dd><p>Represents an integer field.</p>
</dd>
<dt><a href="#FloatField">FloatField</a> ⇐ <code><a href="#NumberField">NumberField</a></code></dt>
<dd><p>Represents a floating-point number field.</p>
</dd>
<dt><a href="#EnumField">EnumField</a> ⇐ <code><a href="#BaseField">BaseField</a></code></dt>
<dd><p>Represents an enumeration field.</p>
</dd>
<dt><a href="#JsonField">JsonField</a> ⇐ <code><a href="#BaseField">BaseField</a></code></dt>
<dd><p>Represents a JSON field.</p>
</dd>
<dt><a href="#BufferField">BufferField</a> ⇐ <code><a href="#BaseField">BaseField</a></code></dt>
<dd><p>Represents a buffer field.</p>
</dd>
<dt><a href="#ForeignField">ForeignField</a> ⇐ <code><a href="#BaseField">BaseField</a></code></dt>
<dd><p>Represents a foreign field.</p>
</dd>
<dt><a href="#ModelBuilder">ModelBuilder</a></dt>
<dd><p>Represents a Model Builder.</p>
</dd>
<dt><a href="#Model">Model</a></dt>
<dd><p>Represents a model.</p>
</dd>
<dt><a href="#PicobufNode">PicobufNode</a> ⇐ <code>Picobuf</code></dt>
<dd><p>Represents the PicobufNode class, which extends Picobuf.</p>
</dd>
<dt><a href="#Method">Method</a></dt>
<dd><p>Represents a Method.</p>
</dd>
<dt><a href="#Service">Service</a></dt>
<dd><p>Represents a Service.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#DEFAULT_CONFIG">DEFAULT_CONFIG</a> : <code>Object</code></dt>
<dd><p>Default configuration values.</p>
</dd>
<dt><a href="#GlobalConfig">GlobalConfig</a> : <code><a href="#Config">Config</a></code></dt>
<dd><p>The global configuration instance.</p>
</dd>
<dt><a href="#DEFAULT_BUFFERS">DEFAULT_BUFFERS</a> : <code>Array.&lt;string&gt;</code></dt>
<dd><p>Default buffers.</p>
</dd>
<dt><a href="#DEFAULT_FIELD_TYPE">DEFAULT_FIELD_TYPE</a> : <code>string</code></dt>
<dd><p>Default field type.</p>
</dd>
<dt><a href="#DEFAULT_OBJECT_MODE">DEFAULT_OBJECT_MODE</a> : <code>boolean</code></dt>
<dd><p>Default object mode.</p>
</dd>
<dt><a href="#DEFAULT_ENCODER">DEFAULT_ENCODER</a> : <code>string</code></dt>
<dd><p>Default encoder.</p>
</dd>
<dt><a href="#SINGLE_PROP">SINGLE_PROP</a> : <code>string</code></dt>
<dd><p>Single property.</p>
</dd>
<dt><a href="#DEFAULT_STRICT">DEFAULT_STRICT</a> : <code>boolean</code></dt>
<dd><p>Default strict setting.</p>
</dd>
<dt><a href="#MODEL_TYPES">MODEL_TYPES</a> : <code>Object</code></dt>
<dd><p>Model types.</p>
</dd>
<dt><a href="#GlobalDomain">GlobalDomain</a> : <code><a href="#Domain">Domain</a></code></dt>
<dd><p>The global domain instance.</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><p>Picobuf utilities.
This module provides a custom utility library, combining individual lodash function modules into a single object.
It&#39;s designed to provide the most frequently used lodash functions, while minimizing the amount of code that&#39;s needed.
Each function is imported from its own lodash module, which allows for efficient tree-shaking by the bundler.
Additionally, the module includes some custom utilities such as <code>isBrowser</code> for checking if the code is running in a browser environment.</p>
</dd>
</dl>

<a name="module_Picobuf"></a>

## Picobuf
Represents the main class for the Picobuf library.

Picobuf can be instantiated in two ways: using the `new` keyword or calling `Picobuf` as a function. Both methods are equivalent.
The constructor can receive an optional `definitions` parameter, which is an object that can include model, enum, and service definitions.
Alternatively, these elements can be defined after instantiation, using the relevant methods.

A Picobuf instance is a Proxy object, so it allows destructuring of models, enums, and services directly from the instance.


* [Picobuf](#module_Picobuf)
    * [~Picobuf](#module_Picobuf..Picobuf)
        * [new Picobuf([options], config, domain)](#new_module_Picobuf..Picobuf_new)
        * _instance_
            * [.load(options)](#module_Picobuf..Picobuf+load)
            * [.setDomain(domain)](#module_Picobuf..Picobuf+setDomain)
            * [.createModel(name, fields, config, [modelClass])](#module_Picobuf..Picobuf+createModel) ⇒ [<code>Model</code>](#Model)
            * [.createModels(models)](#module_Picobuf..Picobuf+createModels)
            * [.getModel(name)](#module_Picobuf..Picobuf+getModel) ⇒ [<code>Model</code>](#Model) \| <code>undefined</code>
            * [.createEnum(name, values, config, [enumClass])](#module_Picobuf..Picobuf+createEnum) ⇒ [<code>Enum</code>](#Enum)
            * [.createEnums(enums)](#module_Picobuf..Picobuf+createEnums)
            * [.getEnum(name)](#module_Picobuf..Picobuf+getEnum) ⇒ [<code>Enum</code>](#Enum) \| <code>undefined</code>
            * [.createService(name, definition)](#module_Picobuf..Picobuf+createService) ⇒ [<code>Service</code>](#Service)
            * [.createServices(services)](#module_Picobuf..Picobuf+createServices)
            * [.getService(name)](#module_Picobuf..Picobuf+getService) ⇒ [<code>Service</code>](#Service) \| <code>undefined</code>
        * _static_
            * [.set(newConfig)](#module_Picobuf..Picobuf.set)

<a name="module_Picobuf..Picobuf"></a>

### Picobuf~Picobuf
**Kind**: inner class of [<code>Picobuf</code>](#module_Picobuf)  

* [~Picobuf](#module_Picobuf..Picobuf)
    * [new Picobuf([options], config, domain)](#new_module_Picobuf..Picobuf_new)
    * _instance_
        * [.load(options)](#module_Picobuf..Picobuf+load)
        * [.setDomain(domain)](#module_Picobuf..Picobuf+setDomain)
        * [.createModel(name, fields, config, [modelClass])](#module_Picobuf..Picobuf+createModel) ⇒ [<code>Model</code>](#Model)
        * [.createModels(models)](#module_Picobuf..Picobuf+createModels)
        * [.getModel(name)](#module_Picobuf..Picobuf+getModel) ⇒ [<code>Model</code>](#Model) \| <code>undefined</code>
        * [.createEnum(name, values, config, [enumClass])](#module_Picobuf..Picobuf+createEnum) ⇒ [<code>Enum</code>](#Enum)
        * [.createEnums(enums)](#module_Picobuf..Picobuf+createEnums)
        * [.getEnum(name)](#module_Picobuf..Picobuf+getEnum) ⇒ [<code>Enum</code>](#Enum) \| <code>undefined</code>
        * [.createService(name, definition)](#module_Picobuf..Picobuf+createService) ⇒ [<code>Service</code>](#Service)
        * [.createServices(services)](#module_Picobuf..Picobuf+createServices)
        * [.getService(name)](#module_Picobuf..Picobuf+getService) ⇒ [<code>Service</code>](#Service) \| <code>undefined</code>
    * _static_
        * [.set(newConfig)](#module_Picobuf..Picobuf.set)

<a name="new_module_Picobuf..Picobuf_new"></a>

#### new Picobuf([options], config, domain)
Creates a new instance of Picobuf.

**Throws**:

- <code>Error</code> If the options are not valid or if the loading from file is attempted outside Node.js environment.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Optional options to configure the Picobuf instance. |
| [options.models] | <code>object</code> | An object where keys are model names and values are model definitions. |
| [options.enums] | <code>object</code> | An object where keys are enum names and values are enum definitions. |
| [options.services] | <code>object</code> | An object where keys are service names and values are service definitions. |
| config | [<code>Config</code>](#Config) | The configuration options for the Picobuf. |
| domain | [<code>Domain</code>](#Domain) | The domain for the Picobuf. |

<a name="module_Picobuf..Picobuf+load"></a>

#### picobuf.load(options)
Loads the provided options into the Picobuf.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options to load. |

<a name="module_Picobuf..Picobuf+setDomain"></a>

#### picobuf.setDomain(domain)
Sets the domain for the Picobuf.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  

| Param | Type | Description |
| --- | --- | --- |
| domain | [<code>Domain</code>](#Domain) | The domain to set. |

<a name="module_Picobuf..Picobuf+createModel"></a>

#### picobuf.createModel(name, fields, config, [modelClass]) ⇒ [<code>Model</code>](#Model)
Creates a new model in the Picobuf domain.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  
**Returns**: [<code>Model</code>](#Model) - The created model.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the model. |
| fields | <code>Object</code> |  | The fields for the model. |
| config | <code>ConfigOptions</code> |  | The configuration options for the model. |
| [modelClass] | [<code>Model</code>](#Model) | <code>Model</code> | The class for the model. |

<a name="module_Picobuf..Picobuf+createModels"></a>

#### picobuf.createModels(models)
Creates multiple models in the Picobuf domain.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  

| Param | Type | Description |
| --- | --- | --- |
| models | <code>Object</code> | An object mapping names to fields for each model. |

<a name="module_Picobuf..Picobuf+getModel"></a>

#### picobuf.getModel(name) ⇒ [<code>Model</code>](#Model) \| <code>undefined</code>
Retrieves a model from the Picobuf domain by its name.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  
**Returns**: [<code>Model</code>](#Model) \| <code>undefined</code> - The retrieved model or undefined if the model does not exist.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the model. |

<a name="module_Picobuf..Picobuf+createEnum"></a>

#### picobuf.createEnum(name, values, config, [enumClass]) ⇒ [<code>Enum</code>](#Enum)
Creates a new enum in the Picobuf domain.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  
**Returns**: [<code>Enum</code>](#Enum) - The created enum.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the enum. |
| values | <code>Array.&lt;string&gt;</code> |  | The values for the enum. |
| config | <code>ConfigOptions</code> |  | The configuration options for the enum. |
| [enumClass] | [<code>Enum</code>](#Enum) | <code>Enum</code> | The class for the enum. |

<a name="module_Picobuf..Picobuf+createEnums"></a>

#### picobuf.createEnums(enums)
Creates multiple enums in the Picobuf domain.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  

| Param | Type | Description |
| --- | --- | --- |
| enums | <code>Object</code> | An object mapping names to values for each enum. |

<a name="module_Picobuf..Picobuf+getEnum"></a>

#### picobuf.getEnum(name) ⇒ [<code>Enum</code>](#Enum) \| <code>undefined</code>
Retrieves an enum from the Picobuf domain by its name.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  
**Returns**: [<code>Enum</code>](#Enum) \| <code>undefined</code> - The retrieved enum or undefined if the enum does not exist.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the enum. |

<a name="module_Picobuf..Picobuf+createService"></a>

#### picobuf.createService(name, definition) ⇒ [<code>Service</code>](#Service)
Creates a new service in the Picobuf domain.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  
**Returns**: [<code>Service</code>](#Service) - The created service.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the service. |
| definition | <code>Object</code> | The definition for the service. |

<a name="module_Picobuf..Picobuf+createServices"></a>

#### picobuf.createServices(services)
Creates multiple services in the Picobuf domain.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  

| Param | Type | Description |
| --- | --- | --- |
| services | <code>Object</code> | An object mapping names to definitions for each service. |

<a name="module_Picobuf..Picobuf+getService"></a>

#### picobuf.getService(name) ⇒ [<code>Service</code>](#Service) \| <code>undefined</code>
Retrieves a service from the Picobuf domain by its name.

**Kind**: instance method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  
**Returns**: [<code>Service</code>](#Service) \| <code>undefined</code> - The retrieved service or undefined if the service does not exist.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the service. |

<a name="module_Picobuf..Picobuf.set"></a>

#### Picobuf.set(newConfig)
Sets the Config for the Picobuf class.

**Kind**: static method of [<code>Picobuf</code>](#module_Picobuf..Picobuf)  

| Param | Type | Description |
| --- | --- | --- |
| newConfig | <code>ConfigOptions</code> | The new configuration options for the Picobuf class. |

<a name="Config"></a>

## Config : [<code>Config</code>](#Config)
Represents the Config class that handles configuration for the application.

**Kind**: global class  

* [Config](#Config) : [<code>Config</code>](#Config)
    * [new Config(initialConfig)](#new_Config_new)
    * _instance_
        * [.defaults](#Config+defaults) : <code>Object</code>
        * [.setConfig(newConfig)](#Config+setConfig)
        * [.setDefault(defaultConfig)](#Config+setDefault)
        * [.get(key, [defaultValue])](#Config+get) ⇒ <code>any</code>
        * [.getConfig()](#Config+getConfig) ⇒ <code>Object</code>
    * _static_
        * [.get(config)](#Config.get) ⇒ [<code>Config</code>](#Config)
        * [.set(newConfig)](#Config.set) ⇒ [<code>Config</code>](#Config)
        * [.getConfig(config)](#Config.getConfig) ⇒ <code>Object</code>
        * [.setConfig(newConfig)](#Config.setConfig)

<a name="new_Config_new"></a>

### new Config(initialConfig)
Creates a new Config instance.


| Param | Type | Description |
| --- | --- | --- |
| initialConfig | <code>Object</code> | The initial configuration. |

<a name="Config+defaults"></a>

### config.defaults : <code>Object</code>
The default configuration.

**Kind**: instance property of [<code>Config</code>](#Config)  
<a name="Config+setConfig"></a>

### config.setConfig(newConfig)
Updates the current configuration.

**Kind**: instance method of [<code>Config</code>](#Config)  

| Param | Type | Description |
| --- | --- | --- |
| newConfig | <code>Object</code> | The new configuration. |

<a name="Config+setDefault"></a>

### config.setDefault(defaultConfig)
Merges the default configuration into the current configuration.

**Kind**: instance method of [<code>Config</code>](#Config)  

| Param | Type | Description |
| --- | --- | --- |
| defaultConfig | <code>Object</code> | The default configuration. |

<a name="Config+get"></a>

### config.get(key, [defaultValue]) ⇒ <code>any</code>
Gets the value of a key from the configuration.

**Kind**: instance method of [<code>Config</code>](#Config)  
**Returns**: <code>any</code> - The value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | The key. |
| [defaultValue] | <code>any</code> | <code></code> | The default value if key is not found. |

<a name="Config+getConfig"></a>

### config.getConfig() ⇒ <code>Object</code>
Gets the current configuration.

**Kind**: instance method of [<code>Config</code>](#Config)  
**Returns**: <code>Object</code> - The current configuration.  
<a name="Config.get"></a>

### Config.get(config) ⇒ [<code>Config</code>](#Config)
Returns an instance of Config based on the passed config parameter.

**Kind**: static method of [<code>Config</code>](#Config)  
**Returns**: [<code>Config</code>](#Config) - The instance of Config.  

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Config</code>](#Config) \| <code>Object</code> | The config object. |

<a name="Config.set"></a>

### Config.set(newConfig) ⇒ [<code>Config</code>](#Config)
Updates the global configuration.

**Kind**: static method of [<code>Config</code>](#Config)  
**Returns**: [<code>Config</code>](#Config) - The updated global configuration.  

| Param | Type | Description |
| --- | --- | --- |
| newConfig | <code>Object</code> | The new configuration. |

<a name="Config.getConfig"></a>

### Config.getConfig(config) ⇒ <code>Object</code>
Returns the configuration object of a Config instance or default config.

**Kind**: static method of [<code>Config</code>](#Config)  
**Returns**: <code>Object</code> - The configuration object.  

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Config</code>](#Config) \| <code>Object</code> | The config object. |

<a name="Config.setConfig"></a>

### Config.setConfig(newConfig)
Merges new configuration with default configuration.

**Kind**: static method of [<code>Config</code>](#Config)  

| Param | Type | Description |
| --- | --- | --- |
| newConfig | <code>Object</code> | The new configuration. |

<a name="Domain"></a>

## Domain : [<code>Domain</code>](#Domain)
Represents a Domain.

**Kind**: global class  

* [Domain](#Domain) : [<code>Domain</code>](#Domain)
    * [new Domain(config)](#new_Domain_new)
    * [.createModel(name, fields, config, modelClass)](#Domain+createModel) ⇒ <code>object</code>
    * [.setModel(name, model)](#Domain+setModel)
    * [.getModel(name)](#Domain+getModel) ⇒ <code>object</code> \| <code>null</code>
    * [.createEnum(name, values, config, enumClass)](#Domain+createEnum) ⇒ <code>object</code>
    * [.getEnum(name)](#Domain+getEnum) ⇒ <code>object</code> \| <code>null</code>
    * [.setEnum(name, enumInstance)](#Domain+setEnum)

<a name="new_Domain_new"></a>

### new Domain(config)
Creates a new instance of Domain.
This class provides methods to manage models and enums.


| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Config</code>](#Config) | A Config instance. |

<a name="Domain+createModel"></a>

### domain.createModel(name, fields, config, modelClass) ⇒ <code>object</code>
Creates a new Model instance.

**Kind**: instance method of [<code>Domain</code>](#Domain)  
**Returns**: <code>object</code> - The newly created model instance.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the model. |
| fields | <code>object</code> | The fields for the model. |
| config | [<code>Config</code>](#Config) | A Config instance for the model. |
| modelClass | <code>function</code> | The constructor of the model class. |

<a name="Domain+setModel"></a>

### domain.setModel(name, model)
Sets a Model in the Domain.

**Kind**: instance method of [<code>Domain</code>](#Domain)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the model. |
| model | <code>object</code> | The model instance to be set. |

<a name="Domain+getModel"></a>

### domain.getModel(name) ⇒ <code>object</code> \| <code>null</code>
Gets a Model from the Domain.

**Kind**: instance method of [<code>Domain</code>](#Domain)  
**Returns**: <code>object</code> \| <code>null</code> - The requested model, if found. Otherwise, returns null.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the model. |

<a name="Domain+createEnum"></a>

### domain.createEnum(name, values, config, enumClass) ⇒ <code>object</code>
Creates a new Enum instance.

**Kind**: instance method of [<code>Domain</code>](#Domain)  
**Returns**: <code>object</code> - The newly created enum instance.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the enum. |
| values | <code>Array.&lt;string&gt;</code> | The values for the enum. |
| config | [<code>Config</code>](#Config) | A Config instance for the enum. |
| enumClass | <code>function</code> | The constructor of the enum class. |

<a name="Domain+getEnum"></a>

### domain.getEnum(name) ⇒ <code>object</code> \| <code>null</code>
Gets an Enum from the Domain.

**Kind**: instance method of [<code>Domain</code>](#Domain)  
**Returns**: <code>object</code> \| <code>null</code> - The requested enum, if found. Otherwise, returns null.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the enum. |

<a name="Domain+setEnum"></a>

### domain.setEnum(name, enumInstance)
Sets an Enum in the Domain.

**Kind**: instance method of [<code>Domain</code>](#Domain)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the enum. |
| enumInstance | <code>object</code> | The enum instance to be set. |

<a name="BaseEncoder"></a>

## BaseEncoder
Represents a base encoder.

**Kind**: global class  

* [BaseEncoder](#BaseEncoder)
    * [new BaseEncoder(model)](#new_BaseEncoder_new)
    * [.encode(data)](#BaseEncoder+encode)
    * [.decode(data)](#BaseEncoder+decode)

<a name="new_BaseEncoder_new"></a>

### new BaseEncoder(model)
Creates a new instance of BaseEncoder.

**Throws**:

- <code>TypeError</code> - If a new instance of BaseEncoder is attempted to be created directly.


| Param | Type | Description |
| --- | --- | --- |
| model | [<code>Model</code>](#Model) | The model that the encoder will operate on. |

<a name="BaseEncoder+encode"></a>

### baseEncoder.encode(data)
Method stub for encoding data.

**Kind**: instance method of [<code>BaseEncoder</code>](#BaseEncoder)  
**Throws**:

- <code>Error</code> - If the method is not implemented.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to encode. |

<a name="BaseEncoder+decode"></a>

### baseEncoder.decode(data)
Method stub for decoding data.

**Kind**: instance method of [<code>BaseEncoder</code>](#BaseEncoder)  
**Throws**:

- <code>Error</code> - If the method is not implemented.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to decode. |

<a name="NoneEncoder"></a>

## NoneEncoder ⇐ [<code>BaseEncoder</code>](#BaseEncoder)
Represents a NoneEncoder.

**Kind**: global class  
**Extends**: [<code>BaseEncoder</code>](#BaseEncoder)  

* [NoneEncoder](#NoneEncoder) ⇐ [<code>BaseEncoder</code>](#BaseEncoder)
    * [.encode(data)](#NoneEncoder+encode) ⇒ <code>\*</code>
    * [.decode(data)](#NoneEncoder+decode) ⇒ <code>\*</code>

<a name="NoneEncoder+encode"></a>

### noneEncoder.encode(data) ⇒ <code>\*</code>
Encodes the data by returning it unchanged.

**Kind**: instance method of [<code>NoneEncoder</code>](#NoneEncoder)  
**Overrides**: [<code>encode</code>](#BaseEncoder+encode)  
**Returns**: <code>\*</code> - - The unchanged data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to encode. |

<a name="NoneEncoder+decode"></a>

### noneEncoder.decode(data) ⇒ <code>\*</code>
Decodes the data by returning it unchanged.

**Kind**: instance method of [<code>NoneEncoder</code>](#NoneEncoder)  
**Overrides**: [<code>decode</code>](#BaseEncoder+decode)  
**Returns**: <code>\*</code> - - The unchanged data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to decode. |

<a name="MsgPackEncoder"></a>

## MsgPackEncoder ⇐ [<code>BaseEncoder</code>](#BaseEncoder)
Represents a MsgPackEncoder.

**Kind**: global class  
**Extends**: [<code>BaseEncoder</code>](#BaseEncoder)  

* [MsgPackEncoder](#MsgPackEncoder) ⇐ [<code>BaseEncoder</code>](#BaseEncoder)
    * [.encode(data)](#MsgPackEncoder+encode) ⇒ <code>\*</code>
    * [.decode(data)](#MsgPackEncoder+decode) ⇒ <code>\*</code>

<a name="MsgPackEncoder+encode"></a>

### msgPackEncoder.encode(data) ⇒ <code>\*</code>
Encodes the data using msgpack.

**Kind**: instance method of [<code>MsgPackEncoder</code>](#MsgPackEncoder)  
**Overrides**: [<code>encode</code>](#BaseEncoder+encode)  
**Returns**: <code>\*</code> - - The encoded data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to encode. |

<a name="MsgPackEncoder+decode"></a>

### msgPackEncoder.decode(data) ⇒ <code>\*</code>
Decodes the data using msgpack.

**Kind**: instance method of [<code>MsgPackEncoder</code>](#MsgPackEncoder)  
**Overrides**: [<code>decode</code>](#BaseEncoder+decode)  
**Returns**: <code>\*</code> - - The decoded data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to decode. |

<a name="Enum"></a>

## Enum
Represents an enumeration.

**Kind**: global class  

* [Enum](#Enum)
    * [new Enum(name, values, config, [domain])](#new_Enum_new)
    * [.hasValue(value)](#Enum+hasValue) ⇒ <code>boolean</code>
    * [.getIndex(value)](#Enum+getIndex) ⇒ <code>number</code>
    * [.getValue(index)](#Enum+getValue) ⇒ <code>\*</code>
    * [.addValue(value)](#Enum+addValue) ⇒ <code>void</code>

<a name="new_Enum_new"></a>

### new Enum(name, values, config, [domain])
Creates a new instance of Enum.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the enum. |
| values | <code>Array.&lt;string&gt;</code> |  | The values of the enum. |
| config | <code>ConfigOptions</code> |  | The configuration options for the enum. |
| [domain] | [<code>Domain</code>](#Domain) | <code>GlobalDomain</code> | The domain for the enum, defaults to GlobalDomain if none provided. |

<a name="Enum+hasValue"></a>

### enum.hasValue(value) ⇒ <code>boolean</code>
Checks if a value exists in the enumeration.

**Kind**: instance method of [<code>Enum</code>](#Enum)  
**Returns**: <code>boolean</code> - True if the value exists, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="Enum+getIndex"></a>

### enum.getIndex(value) ⇒ <code>number</code>
Retrieves the index of a value in the enumeration.

**Kind**: instance method of [<code>Enum</code>](#Enum)  
**Returns**: <code>number</code> - The index of the value, or undefined if the value does not exist.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to get the index for. |

<a name="Enum+getValue"></a>

### enum.getValue(index) ⇒ <code>\*</code>
Retrieves the value at a specific index in the enumeration.

**Kind**: instance method of [<code>Enum</code>](#Enum)  
**Returns**: <code>\*</code> - The value at the specified index, or undefined if no value exists at that index.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index to get the value for. |

<a name="Enum+addValue"></a>

### enum.addValue(value) ⇒ <code>void</code>
Adds a new value to the enum.

**Kind**: instance method of [<code>Enum</code>](#Enum)  
**Throws**:

- <code>Error</code> If the value already exists in the enum.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to be added to the enum. |

<a name="Field"></a>

## Field
Represents a Field.

**Kind**: global class  
<a name="new_Field_new"></a>

### new Field(name, field, config, domain)
Creates a new instance of Field.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the field. |
| field | <code>FieldOption</code> | The field option for the field. |
| config | <code>ConfigOptions</code> | The configuration options for the field. |
| domain | [<code>Domain</code>](#Domain) | The domain for the field. |

<a name="BaseField"></a>

## BaseField
Represents a base field. This is an abstract base class and cannot be instantiated directly.

**Kind**: global class  

* [BaseField](#BaseField)
    * [new BaseField(name, field, config, domain)](#new_BaseField_new)
    * [.validate(value)](#BaseField+validate)
    * [.serialize(data)](#BaseField+serialize) ⇒ <code>\*</code>
    * [.deserialize(data)](#BaseField+deserialize) ⇒ <code>\*</code>

<a name="new_BaseField_new"></a>

### new BaseField(name, field, config, domain)
Creates a new instance of BaseField.

**Throws**:

- <code>TypeError</code> If attempted to be instantiated directly.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the field. |
| field | <code>Object</code> | An object representing the field. This object should include 'type', 'required', 'default', and 'list' properties. |
| config | <code>ConfigOptions</code> | The configuration options for the field. |
| domain | [<code>Domain</code>](#Domain) | The domain for the field. |

<a name="BaseField+validate"></a>

### baseField.validate(value)
Validates the provided value against the field.

**Kind**: instance method of [<code>BaseField</code>](#BaseField)  
**Throws**:

- <code>Error</code> If the value is of an incorrect type for the field.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="BaseField+serialize"></a>

### baseField.serialize(data) ⇒ <code>\*</code>
Serializes the provided data.

**Kind**: instance method of [<code>BaseField</code>](#BaseField)  
**Returns**: <code>\*</code> - The serialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to serialize. |

<a name="BaseField+deserialize"></a>

### baseField.deserialize(data) ⇒ <code>\*</code>
Deserializes the provided data.

**Kind**: instance method of [<code>BaseField</code>](#BaseField)  
**Returns**: <code>\*</code> - The deserialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to deserialize. |

<a name="StringField"></a>

## StringField ⇐ [<code>BaseField</code>](#BaseField)
Represents a string field.

**Kind**: global class  
**Extends**: [<code>BaseField</code>](#BaseField)  

* [StringField](#StringField) ⇐ [<code>BaseField</code>](#BaseField)
    * [.validate(value)](#BaseField+validate)
    * [.serialize(data)](#BaseField+serialize) ⇒ <code>\*</code>
    * [.deserialize(data)](#BaseField+deserialize) ⇒ <code>\*</code>

<a name="BaseField+validate"></a>

### stringField.validate(value)
Validates the provided value against the field.

**Kind**: instance method of [<code>StringField</code>](#StringField)  
**Throws**:

- <code>Error</code> If the value is of an incorrect type for the field.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="BaseField+serialize"></a>

### stringField.serialize(data) ⇒ <code>\*</code>
Serializes the provided data.

**Kind**: instance method of [<code>StringField</code>](#StringField)  
**Returns**: <code>\*</code> - The serialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to serialize. |

<a name="BaseField+deserialize"></a>

### stringField.deserialize(data) ⇒ <code>\*</code>
Deserializes the provided data.

**Kind**: instance method of [<code>StringField</code>](#StringField)  
**Returns**: <code>\*</code> - The deserialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to deserialize. |

<a name="BooleanField"></a>

## BooleanField ⇐ [<code>BaseField</code>](#BaseField)
Represents a boolean field.

**Kind**: global class  
**Extends**: [<code>BaseField</code>](#BaseField)  

* [BooleanField](#BooleanField) ⇐ [<code>BaseField</code>](#BaseField)
    * [.validate(value)](#BooleanField+validate)
    * [.serialize(value)](#BooleanField+serialize) ⇒ <code>number</code>
    * [.deserialize(value)](#BooleanField+deserialize) ⇒ <code>boolean</code>

<a name="BooleanField+validate"></a>

### booleanField.validate(value)
Validates the provided boolean value.

**Kind**: instance method of [<code>BooleanField</code>](#BooleanField)  
**Overrides**: [<code>validate</code>](#BaseField+validate)  
**Throws**:

- <code>Error</code> If the value is not a boolean.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="BooleanField+serialize"></a>

### booleanField.serialize(value) ⇒ <code>number</code>
Serializes the provided boolean value to 1 (for true) or 0 (for false).

**Kind**: instance method of [<code>BooleanField</code>](#BooleanField)  
**Overrides**: [<code>serialize</code>](#BaseField+serialize)  
**Returns**: <code>number</code> - The serialized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The boolean value to serialize. |

<a name="BooleanField+deserialize"></a>

### booleanField.deserialize(value) ⇒ <code>boolean</code>
Deserializes the provided value to a boolean. 1 is deserialized to true, and anything else to false.

**Kind**: instance method of [<code>BooleanField</code>](#BooleanField)  
**Overrides**: [<code>deserialize</code>](#BaseField+deserialize)  
**Returns**: <code>boolean</code> - The deserialized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to deserialize. |

<a name="NumberField"></a>

## NumberField ⇐ [<code>BaseField</code>](#BaseField)
Represents a numeric field.

**Kind**: global class  
**Extends**: [<code>BaseField</code>](#BaseField)  

* [NumberField](#NumberField) ⇐ [<code>BaseField</code>](#BaseField)
    * [.validate(value)](#NumberField+validate)
    * [.serialize(data)](#BaseField+serialize) ⇒ <code>\*</code>
    * [.deserialize(data)](#BaseField+deserialize) ⇒ <code>\*</code>

<a name="NumberField+validate"></a>

### numberField.validate(value)
Validates the provided numeric value.

**Kind**: instance method of [<code>NumberField</code>](#NumberField)  
**Overrides**: [<code>validate</code>](#BaseField+validate)  
**Throws**:

- <code>Error</code> If the value is not a number or is NaN.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="BaseField+serialize"></a>

### numberField.serialize(data) ⇒ <code>\*</code>
Serializes the provided data.

**Kind**: instance method of [<code>NumberField</code>](#NumberField)  
**Returns**: <code>\*</code> - The serialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to serialize. |

<a name="BaseField+deserialize"></a>

### numberField.deserialize(data) ⇒ <code>\*</code>
Deserializes the provided data.

**Kind**: instance method of [<code>NumberField</code>](#NumberField)  
**Returns**: <code>\*</code> - The deserialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to deserialize. |

<a name="IntegerField"></a>

## IntegerField ⇐ [<code>NumberField</code>](#NumberField)
Represents an integer field.

**Kind**: global class  
**Extends**: [<code>NumberField</code>](#NumberField)  

* [IntegerField](#IntegerField) ⇐ [<code>NumberField</code>](#NumberField)
    * [.validate(value)](#IntegerField+validate)
    * [.serialize(data)](#BaseField+serialize) ⇒ <code>\*</code>
    * [.deserialize(data)](#BaseField+deserialize) ⇒ <code>\*</code>

<a name="IntegerField+validate"></a>

### integerField.validate(value)
Validates the provided integer value.

**Kind**: instance method of [<code>IntegerField</code>](#IntegerField)  
**Overrides**: [<code>validate</code>](#NumberField+validate)  
**Throws**:

- <code>Error</code> If the value is not an integer.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="BaseField+serialize"></a>

### integerField.serialize(data) ⇒ <code>\*</code>
Serializes the provided data.

**Kind**: instance method of [<code>IntegerField</code>](#IntegerField)  
**Returns**: <code>\*</code> - The serialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to serialize. |

<a name="BaseField+deserialize"></a>

### integerField.deserialize(data) ⇒ <code>\*</code>
Deserializes the provided data.

**Kind**: instance method of [<code>IntegerField</code>](#IntegerField)  
**Returns**: <code>\*</code> - The deserialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to deserialize. |

<a name="FloatField"></a>

## FloatField ⇐ [<code>NumberField</code>](#NumberField)
Represents a floating-point number field.

**Kind**: global class  
**Extends**: [<code>NumberField</code>](#NumberField)  

* [FloatField](#FloatField) ⇐ [<code>NumberField</code>](#NumberField)
    * [.serialize(data)](#FloatField+serialize) ⇒ <code>string</code>
    * [.deserialize(data)](#FloatField+deserialize) ⇒ <code>number</code>
    * [.validate(value)](#NumberField+validate)

<a name="FloatField+serialize"></a>

### floatField.serialize(data) ⇒ <code>string</code>
Serializes the provided floating-point number.

**Kind**: instance method of [<code>FloatField</code>](#FloatField)  
**Overrides**: [<code>serialize</code>](#BaseField+serialize)  
**Returns**: <code>string</code> - The serialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to serialize. |

<a name="FloatField+deserialize"></a>

### floatField.deserialize(data) ⇒ <code>number</code>
Deserializes the provided string to a floating-point number.

**Kind**: instance method of [<code>FloatField</code>](#FloatField)  
**Overrides**: [<code>deserialize</code>](#BaseField+deserialize)  
**Returns**: <code>number</code> - The deserialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to deserialize. |

<a name="NumberField+validate"></a>

### floatField.validate(value)
Validates the provided numeric value.

**Kind**: instance method of [<code>FloatField</code>](#FloatField)  
**Throws**:

- <code>Error</code> If the value is not a number or is NaN.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="EnumField"></a>

## EnumField ⇐ [<code>BaseField</code>](#BaseField)
Represents an enumeration field.

**Kind**: global class  
**Extends**: [<code>BaseField</code>](#BaseField)  

* [EnumField](#EnumField) ⇐ [<code>BaseField</code>](#BaseField)
    * [new EnumField(name, field, config)](#new_EnumField_new)
    * [.validate(value)](#EnumField+validate)
    * [.serialize(value)](#EnumField+serialize) ⇒ <code>number</code>
    * [.deserialize(value)](#EnumField+deserialize) ⇒ <code>string</code>

<a name="new_EnumField_new"></a>

### new EnumField(name, field, config)
Creates a new instance of EnumField.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the enum field. |
| field | <code>object</code> | The field object. |
| config | <code>ConfigOptions</code> | The configuration options for the enum field. |

<a name="EnumField+validate"></a>

### enumField.validate(value)
Validates the provided enum value.

**Kind**: instance method of [<code>EnumField</code>](#EnumField)  
**Overrides**: [<code>validate</code>](#BaseField+validate)  
**Throws**:

- <code>Error</code> If the value is not a string or if it's not a valid enum value.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="EnumField+serialize"></a>

### enumField.serialize(value) ⇒ <code>number</code>
Serializes the provided enum value.

**Kind**: instance method of [<code>EnumField</code>](#EnumField)  
**Overrides**: [<code>serialize</code>](#BaseField+serialize)  
**Returns**: <code>number</code> - The serialized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The enum value to serialize. |

<a name="EnumField+deserialize"></a>

### enumField.deserialize(value) ⇒ <code>string</code>
Deserializes the provided value to an enum value.

**Kind**: instance method of [<code>EnumField</code>](#EnumField)  
**Overrides**: [<code>deserialize</code>](#BaseField+deserialize)  
**Returns**: <code>string</code> - The deserialized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to deserialize. |

<a name="JsonField"></a>

## JsonField ⇐ [<code>BaseField</code>](#BaseField)
Represents a JSON field.

**Kind**: global class  
**Extends**: [<code>BaseField</code>](#BaseField)  

* [JsonField](#JsonField) ⇐ [<code>BaseField</code>](#BaseField)
    * [.validate(value)](#JsonField+validate)
    * [.serialize(data)](#BaseField+serialize) ⇒ <code>\*</code>
    * [.deserialize(data)](#BaseField+deserialize) ⇒ <code>\*</code>

<a name="JsonField+validate"></a>

### jsonField.validate(value)
Validates the provided JSON value.

**Kind**: instance method of [<code>JsonField</code>](#JsonField)  
**Overrides**: [<code>validate</code>](#BaseField+validate)  
**Throws**:

- <code>Error</code> If the value is not an object.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="BaseField+serialize"></a>

### jsonField.serialize(data) ⇒ <code>\*</code>
Serializes the provided data.

**Kind**: instance method of [<code>JsonField</code>](#JsonField)  
**Returns**: <code>\*</code> - The serialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to serialize. |

<a name="BaseField+deserialize"></a>

### jsonField.deserialize(data) ⇒ <code>\*</code>
Deserializes the provided data.

**Kind**: instance method of [<code>JsonField</code>](#JsonField)  
**Returns**: <code>\*</code> - The deserialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to deserialize. |

<a name="BufferField"></a>

## BufferField ⇐ [<code>BaseField</code>](#BaseField)
Represents a buffer field.

**Kind**: global class  
**Extends**: [<code>BaseField</code>](#BaseField)  

* [BufferField](#BufferField) ⇐ [<code>BaseField</code>](#BaseField)
    * [.validate(value)](#BufferField+validate)
    * [.serialize(data)](#BaseField+serialize) ⇒ <code>\*</code>
    * [.deserialize(data)](#BaseField+deserialize) ⇒ <code>\*</code>

<a name="BufferField+validate"></a>

### bufferField.validate(value)
Validates the provided buffer value.

**Kind**: instance method of [<code>BufferField</code>](#BufferField)  
**Overrides**: [<code>validate</code>](#BaseField+validate)  
**Throws**:

- <code>Error</code> If the value is not a buffer.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="BaseField+serialize"></a>

### bufferField.serialize(data) ⇒ <code>\*</code>
Serializes the provided data.

**Kind**: instance method of [<code>BufferField</code>](#BufferField)  
**Returns**: <code>\*</code> - The serialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to serialize. |

<a name="BaseField+deserialize"></a>

### bufferField.deserialize(data) ⇒ <code>\*</code>
Deserializes the provided data.

**Kind**: instance method of [<code>BufferField</code>](#BufferField)  
**Returns**: <code>\*</code> - The deserialized data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to deserialize. |

<a name="ForeignField"></a>

## ForeignField ⇐ [<code>BaseField</code>](#BaseField)
Represents a foreign field.

**Kind**: global class  
**Extends**: [<code>BaseField</code>](#BaseField)  

* [ForeignField](#ForeignField) ⇐ [<code>BaseField</code>](#BaseField)
    * [new ForeignField(name, field, config, domain)](#new_ForeignField_new)
    * [.validate(value)](#ForeignField+validate)
    * [.serialize(value)](#ForeignField+serialize) ⇒ <code>\*</code>
    * [.deserialize(value)](#ForeignField+deserialize) ⇒ <code>\*</code>

<a name="new_ForeignField_new"></a>

### new ForeignField(name, field, config, domain)
Creates a new instance of ForeignField.

**Throws**:

- <code>Error</code> If the model for the foreign field could not be found.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the foreign field. |
| field | <code>object</code> | The field object. |
| config | <code>ConfigOptions</code> | The configuration options for the foreign field. |
| domain | [<code>Domain</code>](#Domain) | The domain for the foreign field. |

<a name="ForeignField+validate"></a>

### foreignField.validate(value)
Validates the provided value using the model of the foreign field.

**Kind**: instance method of [<code>ForeignField</code>](#ForeignField)  
**Overrides**: [<code>validate</code>](#BaseField+validate)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to validate. |

<a name="ForeignField+serialize"></a>

### foreignField.serialize(value) ⇒ <code>\*</code>
Serializes the provided value using the model of the foreign field.

**Kind**: instance method of [<code>ForeignField</code>](#ForeignField)  
**Overrides**: [<code>serialize</code>](#BaseField+serialize)  
**Returns**: <code>\*</code> - The serialized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to serialize. |

<a name="ForeignField+deserialize"></a>

### foreignField.deserialize(value) ⇒ <code>\*</code>
Deserializes the provided value to a model instance of the foreign field.

**Kind**: instance method of [<code>ForeignField</code>](#ForeignField)  
**Overrides**: [<code>deserialize</code>](#BaseField+deserialize)  
**Returns**: <code>\*</code> - The deserialized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to deserialize. |

<a name="ModelBuilder"></a>

## ModelBuilder
Represents a Model Builder.

**Kind**: global class  

* [ModelBuilder](#ModelBuilder)
    * [new ModelBuilder(model, fields, config, domain)](#new_ModelBuilder_new)
    * [.getFields()](#ModelBuilder+getFields) ⇒ <code>Array</code>
    * [.getInitialType()](#ModelBuilder+getInitialType) ⇒ <code>string</code>
    * [.getFieldsArray(arr)](#ModelBuilder+getFieldsArray) ⇒ <code>Array</code>
    * [.getFieldsSingle(input)](#ModelBuilder+getFieldsSingle) ⇒ <code>object</code>
    * [.getFieldsObject(input)](#ModelBuilder+getFieldsObject) ⇒ [<code>Array.&lt;Field&gt;</code>](#Field)
    * [.getEncoder()](#ModelBuilder+getEncoder) ⇒ <code>Encoder</code>
    * [.getEncoderClass(encoder, encoders)](#ModelBuilder+getEncoderClass) ⇒ <code>function</code> \| <code>undefined</code>
    * [.build()](#ModelBuilder+build) ⇒ [<code>Model</code>](#Model)

<a name="new_ModelBuilder_new"></a>

### new ModelBuilder(model, fields, config, domain)
Creates a new instance of ModelBuilder.


| Param | Type | Description |
| --- | --- | --- |
| model | [<code>Model</code>](#Model) | The model to be built. |
| fields | <code>object</code> | The fields of the model. |
| config | <code>ConfigOptions</code> | The configuration options for the model. |
| domain | [<code>Domain</code>](#Domain) | The domain for the model. |

<a name="ModelBuilder+getFields"></a>

### modelBuilder.getFields() ⇒ <code>Array</code>
Fetches the fields for the model.

**Kind**: instance method of [<code>ModelBuilder</code>](#ModelBuilder)  
**Returns**: <code>Array</code> - An array of fields for the model.  
<a name="ModelBuilder+getInitialType"></a>

### modelBuilder.getInitialType() ⇒ <code>string</code>
Determines the initial type of the model.

**Kind**: instance method of [<code>ModelBuilder</code>](#ModelBuilder)  
**Returns**: <code>string</code> - The initial type of the model.  
<a name="ModelBuilder+getFieldsArray"></a>

### modelBuilder.getFieldsArray(arr) ⇒ <code>Array</code>
Converts the model fields into an array.

**Kind**: instance method of [<code>ModelBuilder</code>](#ModelBuilder)  
**Returns**: <code>Array</code> - The converted model fields.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The model fields to convert. |

<a name="ModelBuilder+getFieldsSingle"></a>

### modelBuilder.getFieldsSingle(input) ⇒ <code>object</code>
Fetches a single field from the model.

**Kind**: instance method of [<code>ModelBuilder</code>](#ModelBuilder)  
**Returns**: <code>object</code> - The fetched field.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | The name of the field to fetch. |

<a name="ModelBuilder+getFieldsObject"></a>

### modelBuilder.getFieldsObject(input) ⇒ [<code>Array.&lt;Field&gt;</code>](#Field)
Transforms an object of fields into an array of Field instances.
This method takes into account several field configurations such as `type`, `required`, `default`,
`repeated`, `enum` and creates a Field instance for each field definition.

**Kind**: instance method of [<code>ModelBuilder</code>](#ModelBuilder)  
**Returns**: [<code>Array.&lt;Field&gt;</code>](#Field) - An array of Field instances, each representing a field in the input.

Here's what happens in detail:

- If the field definition is a string, it's assumed to be the `type` of the field. An object is then created with the `type` set to the string.
- If the `type` of the field isn't explicitly set, it's defaulted to the `defaultFieldType` from the configuration.
- If the `required` property isn't explicitly set to a boolean, it's set based on the `strict` mode from the configuration. If strict mode is enabled, the field is considered `required`.
- If a `default` value is provided and strict mode is enabled, the field is marked as not `required`.
- If both a `default` value is provided and the field is marked as `required`, an error is thrown because this is an inconsistent state.
- If the field is marked as `repeated`, the `list` property is set to `true` and `repeated` is deleted.
- If the `type` of the field is an array, the actual `type` is set to the first element of the array and `list` is set to `true`.
- If the `type` starts with '*', the `required` property is set to `true` and the '*' is removed from the `type`.
- If `enum` or `values` properties are provided, the `type` is set to 'enum'.
- If the `type` is 'enum', depending on the `enum` property value:
   - If it's a string, it's assumed to be the name of an Enum instance which is fetched from the domain. The values from the Enum instance are also fetched.
   - If it's an Enum instance, its values are fetched.
   - If it's an array, it's used as the values for the Enum.
- Finally, an Enum instance is created if `enum` is not already an Enum instance.
- For each field, a Field instance is created with the name and the final configuration, and pushed to the array to be returned.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | An object whose properties represent field definitions.  Each property value could be a string (representing a type), or an object with detailed configuration. |

<a name="ModelBuilder+getEncoder"></a>

### modelBuilder.getEncoder() ⇒ <code>Encoder</code>
Fetches the encoder for the model.

**Kind**: instance method of [<code>ModelBuilder</code>](#ModelBuilder)  
**Returns**: <code>Encoder</code> - The encoder for the model.  
<a name="ModelBuilder+getEncoderClass"></a>

### modelBuilder.getEncoderClass(encoder, encoders) ⇒ <code>function</code> \| <code>undefined</code>
Fetches the encoder class based on a string.

**Kind**: instance method of [<code>ModelBuilder</code>](#ModelBuilder)  
**Returns**: <code>function</code> \| <code>undefined</code> - The fetched encoder class.  

| Param | Type | Description |
| --- | --- | --- |
| encoder | <code>string</code> | The name of the encoder to fetch. |
| encoders | <code>object</code> | The object containing the encoder classes keyed by class name. |

<a name="ModelBuilder+build"></a>

### modelBuilder.build() ⇒ [<code>Model</code>](#Model)
Builds the model.

**Kind**: instance method of [<code>ModelBuilder</code>](#ModelBuilder)  
**Returns**: [<code>Model</code>](#Model) - The built model.  
<a name="Model"></a>

## Model
Represents a model.

**Kind**: global class  

* [Model](#Model)
    * [new Model(name, fields, config, [domain])](#new_Model_new)
    * [.create(data, ...args)](#Model+create) ⇒ <code>\*</code>
    * [.validate(data)](#Model+validate) ⇒ <code>boolean</code>
    * [.encode(data)](#Model+encode) ⇒ <code>string</code>
    * [.decode(input)](#Model+decode) ⇒ <code>Object</code>

<a name="new_Model_new"></a>

### new Model(name, fields, config, [domain])
Creates a new instance of Model.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the model. |
| fields | [<code>Array.&lt;Field&gt;</code>](#Field) |  | The fields of the model. |
| config | <code>ConfigOptions</code> |  | The configuration options for the model. |
| [domain] | [<code>Domain</code>](#Domain) | <code>GlobalDomain</code> | The domain for the model, defaults to GlobalDomain if none provided. |

<a name="Model+create"></a>

### model.create(data, ...args) ⇒ <code>\*</code>
Creates a new instance of the model with the provided data.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>\*</code> - The created model instance.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data for the new model instance. |
| ...args | <code>\*</code> | Additional arguments. |

<a name="Model+validate"></a>

### model.validate(data) ⇒ <code>boolean</code>
Validates the provided data against the model.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>boolean</code> - True if the data is valid, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data to validate. |

<a name="Model+encode"></a>

### model.encode(data) ⇒ <code>string</code>
Encodes the provided data.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>string</code> - The encoded data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data to encode. |

<a name="Model+decode"></a>

### model.decode(input) ⇒ <code>Object</code>
Decodes the provided input.

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>Object</code> - The decoded data.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | The input to decode. |

<a name="PicobufNode"></a>

## PicobufNode ⇐ <code>Picobuf</code>
Represents the PicobufNode class, which extends Picobuf.

**Kind**: global class  
**Extends**: <code>Picobuf</code>  

* [PicobufNode](#PicobufNode) ⇐ <code>Picobuf</code>
    * [new PicobufNode(options, config, domain)](#new_PicobufNode_new)
    * [.Picobuf](#PicobufNode+Picobuf) : <code>function</code>
    * [.load(options, [loader])](#PicobufNode+load) ⇒ [<code>PicobufNode</code>](#PicobufNode)

<a name="new_PicobufNode_new"></a>

### new PicobufNode(options, config, domain)
Creates a new instance of PicobufNode.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The options for the PicobufNode. |
| config | <code>ConfigOptions</code> | The configuration options for the PicobufNode. |
| domain | [<code>Domain</code>](#Domain) | The domain for the PicobufNode. |

<a name="PicobufNode+Picobuf"></a>

### picobufNode.Picobuf : <code>function</code>
Provides a Proxy for instantiating new PicobufNode objects.

**Kind**: instance property of [<code>PicobufNode</code>](#PicobufNode)  
<a name="PicobufNode+load"></a>

### picobufNode.load(options, [loader]) ⇒ [<code>PicobufNode</code>](#PicobufNode)
Loads configuration data for the PicobufNode.

**Kind**: instance method of [<code>PicobufNode</code>](#PicobufNode)  
**Returns**: [<code>PicobufNode</code>](#PicobufNode) - The PicobufNode instance.  
**Throws**:

- <code>Error</code> Throws an error if an invalid loader is provided or if the options cannot be parsed.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> \| <code>string</code> | The options to load. If a string is passed, it is treated as a file path to load configuration from. |
| [loader] | <code>function</code> \| <code>string</code> | The loader to use for loading the configuration. If a string is passed, it is used to find a default loader function. If not provided, the loader will be determined based on the file extension. |

<a name="Method"></a>

## Method
Represents a Method.

**Kind**: global class  
<a name="new_Method_new"></a>

### new Method(name, requestModel, responseModel)
Creates a new instance of Method.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the method. |
| requestModel | [<code>Model</code>](#Model) | The request model for the method. |
| responseModel | [<code>Model</code>](#Model) | The response model for the method. |

<a name="Service"></a>

## Service
Represents a Service.

**Kind**: global class  

* [Service](#Service)
    * [new Service(name, definition, [domain])](#new_Service_new)
    * [.createMethod(name, requestModel, responseModel, [domain])](#Service+createMethod) ⇒ [<code>Method</code>](#Method)
    * [.getMethod(name)](#Service+getMethod) ⇒ [<code>Method</code>](#Method) \| <code>null</code>

<a name="new_Service_new"></a>

### new Service(name, definition, [domain])
Creates a new instance of Service.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the service. |
| definition | <code>Object</code> |  | The definition of the service. |
| [domain] | [<code>Domain</code>](#Domain) | <code>GlobalDomain</code> | The domain of the service. |

<a name="Service+createMethod"></a>

### service.createMethod(name, requestModel, responseModel, [domain]) ⇒ [<code>Method</code>](#Method)
Creates a new method within the Service.

**Kind**: instance method of [<code>Service</code>](#Service)  
**Returns**: [<code>Method</code>](#Method) - The created method.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name of the method. |
| requestModel | [<code>Model</code>](#Model) \| <code>string</code> \| <code>object</code> |  | The request model for the method. Can be a Model instance, model name string or model definition object. |
| responseModel | [<code>Model</code>](#Model) \| <code>string</code> \| <code>object</code> |  | The response model for the method. Can be a Model instance, model name string or model definition object. |
| [domain] | [<code>Domain</code>](#Domain) | <code>this.domain</code> | The domain for the method. Defaults to the Service's domain. |

<a name="Service+getMethod"></a>

### service.getMethod(name) ⇒ [<code>Method</code>](#Method) \| <code>null</code>
Retrieves a method from the Service by its name.

**Kind**: instance method of [<code>Service</code>](#Service)  
**Returns**: [<code>Method</code>](#Method) \| <code>null</code> - The retrieved method or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the method. |

<a name="DEFAULT_CONFIG"></a>

## DEFAULT\_CONFIG : <code>Object</code>
Default configuration values.

**Kind**: global constant  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| objectMode | <code>boolean</code> | Default object mode. Defaults to `CONSTANTS.DEFAULT_OBJECT_MODE`. |
| strict | <code>boolean</code> | Whether to use strict mode. Defaults to `CONSTANTS.DEFAULT_STRICT`. |
| defaultFieldType | <code>string</code> | The default field type. Defaults to `CONSTANTS.DEFAULT_FIELD_TYPE`. |
| defaultEncoder | <code>string</code> | The default encoder. Defaults to `CONSTANTS.DEFAULT_ENCODER`. |
| singleProp | <code>boolean</code> | Whether to use single property mode. Defaults to `CONSTANTS.SINGLE_PROP`. |
| fieldClasses | <code>Object</code> | The field classes. |
| encoderClasses | <code>Object</code> | The encoder classes. |

<a name="GlobalConfig"></a>

## GlobalConfig : [<code>Config</code>](#Config)
The global configuration instance.

**Kind**: global constant  
<a name="DEFAULT_BUFFERS"></a>

## DEFAULT\_BUFFERS : <code>Array.&lt;string&gt;</code>
Default buffers.

**Kind**: global constant  
<a name="DEFAULT_FIELD_TYPE"></a>

## DEFAULT\_FIELD\_TYPE : <code>string</code>
Default field type.

**Kind**: global constant  
<a name="DEFAULT_OBJECT_MODE"></a>

## DEFAULT\_OBJECT\_MODE : <code>boolean</code>
Default object mode.

**Kind**: global constant  
<a name="DEFAULT_ENCODER"></a>

## DEFAULT\_ENCODER : <code>string</code>
Default encoder.

**Kind**: global constant  
<a name="SINGLE_PROP"></a>

## SINGLE\_PROP : <code>string</code>
Single property.

**Kind**: global constant  
<a name="DEFAULT_STRICT"></a>

## DEFAULT\_STRICT : <code>boolean</code>
Default strict setting.

**Kind**: global constant  
<a name="MODEL_TYPES"></a>

## MODEL\_TYPES : <code>Object</code>
Model types.

**Kind**: global constant  
<a name="GlobalDomain"></a>

## GlobalDomain : [<code>Domain</code>](#Domain)
The global domain instance.

**Kind**: global constant  
<a name="_"></a>

## \_
Picobuf utilities.
This module provides a custom utility library, combining individual lodash function modules into a single object.
It's designed to provide the most frequently used lodash functions, while minimizing the amount of code that's needed.
Each function is imported from its own lodash module, which allows for efficient tree-shaking by the bundler.
Additionally, the module includes some custom utilities such as `isBrowser` for checking if the code is running in a browser environment.

**Kind**: global constant  
**See**: [Lodash Documentation](https://lodash.com/docs/4.17.15)  

* [_](#_)
    * [.isBrowser](#_.isBrowser) : <code>boolean</code>
    * [.log(...args)](#_.log)
    * [.print(...args)](#_.print)
    * [.objProp(obj, key, value, opts)](#_.objProp)
    * [.proxyGet(obj, callback)](#_.proxyGet) ⇒ <code>Proxy</code>
    * [.proxyNew(obj)](#_.proxyNew) ⇒ <code>Proxy</code>
    * [.isBinary(value)](#_.isBinary) ⇒ <code>boolean</code>
    * [.toBuffer(data, [encoding])](#_.toBuffer) ⇒ <code>Buffer</code> \| <code>Uint8Array</code>

<a name="_.isBrowser"></a>

### _.isBrowser : <code>boolean</code>
Checks if the current execution environment is a web browser.
It returns true if the global `window` object is defined, false otherwise.

**Kind**: static property of [<code>\_</code>](#_)  
<a name="_.log"></a>

### _.log(...args)
Log a message to the console.

**Kind**: static method of [<code>\_</code>](#_)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | The message or messages to log. |

<a name="_.print"></a>

### _.print(...args)
Alias for _.log.

**Kind**: static method of [<code>\_</code>](#_)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>\*</code> | The message or messages to log. |

<a name="_.objProp"></a>

### _.objProp(obj, key, value, opts)
Define a property on an object with given options.

**Kind**: static method of [<code>\_</code>](#_)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to define a property on. |
| key | <code>string</code> | The name of the property. |
| value | <code>\*</code> | The value of the property. |
| opts | <code>Object</code> | The property descriptor. |

<a name="_.proxyGet"></a>

### _.proxyGet(obj, callback) ⇒ <code>Proxy</code>
Create a Proxy with a custom getter.

**Kind**: static method of [<code>\_</code>](#_)  
**Returns**: <code>Proxy</code> - The Proxy object.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to wrap. |
| callback | <code>function</code> | The callback to run when getting properties. |

<a name="_.proxyNew"></a>

### _.proxyNew(obj) ⇒ <code>Proxy</code>
Create a Proxy that can be used to instantiate the target as if it were a class.

**Kind**: static method of [<code>\_</code>](#_)  
**Returns**: <code>Proxy</code> - The Proxy object.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>function</code> | The function to wrap. |

<a name="_.isBinary"></a>

### _.isBinary(value) ⇒ <code>boolean</code>
Check if a value is binary.

**Kind**: static method of [<code>\_</code>](#_)  
**Returns**: <code>boolean</code> - Whether the value is binary or not.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="_.toBuffer"></a>

### _.toBuffer(data, [encoding]) ⇒ <code>Buffer</code> \| <code>Uint8Array</code>
Converts data to a buffer (or Uint8Array in a browser context).

**Kind**: static method of [<code>\_</code>](#_)  
**Returns**: <code>Buffer</code> \| <code>Uint8Array</code> - The data as a Buffer or Uint8Array.  
**Throws**:

- <code>Error</code> If the data type is unsupported.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The data to convert. |
| [encoding] | <code>string</code> | The encoding to use. |

