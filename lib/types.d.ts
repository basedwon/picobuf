
declare type ConfigOptions = {
  objectMode?: boolean,
  strict?: boolean,
  defaultFieldType?: string,
  defaultEncoder?: string,
  singleProp?: string,
  fieldClasses?: FieldClasses,
  encoderClasses?: EncoderClasses,
};

declare type FieldOption = {
  type: string | string[],
  required?: boolean,
  default?: any,
  list?: boolean,
  repeated?: boolean,
  enum?: string,
  values?: string[],
};

declare class Config {
  static defaults: ConfigOptions;
  constructor(initialConfig?: ConfigOptions);
  setConfig(newConfig: ConfigOptions): void;
  setDefault(defaultConfig: ConfigOptions): void;
  get(key: string, defaultValue?: any): any;
  getConfig(): ConfigOptions;
  static get(config: ConfigOptions | Config): Config;
  static set(newConfig: ConfigOptions): Config;
  static getConfig(config: ConfigOptions | Config): ConfigOptions;
  static setConfig(newConfig: ConfigOptions): void;
}

declare const GlobalConfig: Config;

declare const DEFAULT_BUFFERS: string[];

declare const DEFAULT_FIELD_TYPE: string;

declare const DEFAULT_OBJECT_MODE: boolean;

declare const DEFAULT_ENCODER: string;

declare const SINGLE_PROP: string;

declare const DEFAULT_STRICT: boolean;

declare const MODEL_TYPES: {
  SINGLE: 'single',
  OBJECT: 'object',
  ARRAY: 'array',
};

declare class Domain {
  constructor(config: ConfigOptions);
  createModel(name: string, fields: object, config?: ConfigOptions, modelClass?: any): any;
  setModel(name: string, model: any): void;
  getModel(name: string): any;
  createEnum(name: string, values: string[], config?: ConfigOptions, enumClass?: any): any;
  getEnum(name: string): any;
  setEnum(name: string, enumInstance: any): void;
}

declare const GlobalDomain: Domain;

declare class BaseEncoder {
  constructor(model: any);
  encode(data: any): any;
  decode(data: any): any;
}

declare class NoneEncoder extends BaseEncoder {
  encode(data: any): any;
  decode(data: any): any;
}

declare class MsgPackEncoder extends BaseEncoder {
  encode(data: any): any;
  decode(data: any): any;
}

declare type EncoderClasses = {
  NoneEncoder: typeof NoneEncoder,
  MsgPackEncoder: typeof MsgPackEncoder,
};

declare class Enum {
  constructor(name: string, values: string[], config: ConfigOptions, domain?: Domain);
  hasValue(value: string): boolean;
  getIndex(value: string): number | void;
  getValue(index: number): string | void;
}

declare class Field {
  constructor(name: string, field: FieldOption, config: ConfigOptions, domain: Domain);
  validate(value: any): void;
  serialize(data: any): any;
  deserialize(data: any): any;
  static getFieldClass(type: string, config: ConfigOptions): { type: string, fieldClass: FieldClass } | {};
}

declare class BaseField {
  static aliases: string[];
  constructor(name: string, field: FieldOption, config: ConfigOptions, domain: Domain);
  validate(value: any): void;
  serialize(data: any): any;
  deserialize(data: any): any;
}

declare class StringField extends BaseField {
  static aliases: string[];
}

declare class BooleanField extends BaseField {
  static aliases: string[];
  validate(value: any): void;
  serialize(value: boolean): number;
  deserialize(value: number): boolean;
}

declare class NumberField extends BaseField {
  static aliases: string[];
  validate(value: any): void;
}

declare class IntegerField extends NumberField {
  static aliases: string[];
  validate(value: any): void;
}

declare class FloatField extends NumberField {
  static aliases: string[];
  serialize(data: number): string;
  deserialize(data: string): number;
}

declare class EnumField extends BaseField {
  constructor(name: string, field: FieldOption, config: ConfigOptions);
  validate(value: any): void;
  serialize(value: string): number | void;
  deserialize(value: number): string | void;
}

declare class JsonField extends BaseField {
  static aliases: string[];
  validate(value: any): void;
}

declare class BufferField extends BaseField {
  static aliases: string[];
  validate(value: any): void;
}

declare class ForeignField extends BaseField {
  constructor(name: string, field: FieldOption, config: ConfigOptions, domain: Domain);
  validate(value: any): void;
  serialize(value: any): any;
  deserialize(value: any): any;
}

declare type FieldClass = typeof BaseField | typeof StringField | typeof BooleanField | typeof NumberField | typeof IntegerField | typeof FloatField | typeof EnumField | typeof JsonField | typeof BufferField | typeof ForeignField;

declare type FieldClasses = {
  StringField: typeof StringField,
  BooleanField: typeof BooleanField,
  NumberField: typeof NumberField,
  IntegerField: typeof IntegerField,
  FloatField: typeof FloatField,
  EnumField: typeof EnumField,
  JsonField: typeof JsonField,
  BufferField: typeof BufferField,
  ForeignField: typeof ForeignField,
};

declare class ModelBuilder {
  constructor(model: any, fields: object | string, config: ConfigOptions, domain: Domain);
  getFields(): Field[];
  getInitialType(): 'single' | 'object' | 'array';
  getFieldsArray(arr: object[]): object;
  getFieldsSingle(input: object): object[];
  getFieldsObject(input: object): Field[];
  getEncoder(): BaseEncoder;
  build(): { type: 'single' | 'object' | 'array', fields: Field[], encoder: BaseEncoder };
}

declare class Model {
  constructor(name: string, fields: object | string, config?: ConfigOptions, domain?: Domain);
  create(data: any, ...args: any[]): any;
  validate(data: any): void;
  encode(data: any): any;
  decode(input: any): any;
}

declare class PicobufNode extends Picobuf {
  static Picobuf: any;
  constructor(options: any, config: ConfigOptions, domain: Domain);
  load(options: any, loader: any): Picobuf;
}

declare class Picobuf {
  static Picobuf: any;
  static Model: typeof Model;
  static Enum: typeof Enum;
  static Config: typeof Config;
  static Service: typeof Service;
  static Domain: typeof Domain;
  static GlobalDomain: Domain;
  constructor(options: any, config: ConfigOptions, domain: Domain);
  load(options: any): void;
  setDomain(domain: Domain): void;
  createModel(name: string, fields: object, config?: ConfigOptions, modelClass?: any): any;
  createModels(models: { [key: string]: object }): void;
  getModel(name: string): any;
  createEnum(name: string, values: string[], config?: ConfigOptions, enumClass?: any): any;
  createEnums(enums: { [key: string]: string[] }): void;
  getEnum(name: string): any;
  createService(name: string, definition?: any): Service;
  createServices(services: { [key: string]: any }): void;
  getService(name: string): Service;
}

declare class Method {
  constructor(name: string, requestModel: any, responseModel: any);
}

declare class Service {
  constructor(name: string, definition?: { [key: string]: { request: any, response: any, domain?: Domain } }, domain?: Domain);
  createMethod(name: string, requestModel: any, responseModel: any, domain?: Domain): Method;
  getMethod(name: string): Method;
}
