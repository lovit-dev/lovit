// --------------------------------------------------------------------------
// Lovit utils/type.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import { isFunction } from '../../../utils/validation/is-function';
import { isObject } from '../../../utils/validation/is-object';

//
// Constants
//

const tupleRegex = /^\[.*\]$/;
const unionRegex = /\|/;
const arrayRegex = /^array$/;

//
// Types
//

type ArrayType = any[];
type Object = Record<string, any>;
type FunctionType = (...args: any[]) => any;

export type TupleType = '[string, function]';
export type UnionType = 'string|object' | 'string|number' | 'string|boolean' | 'number|boolean' | 'array|object';
export type JSType = 'string' | 'number' | 'boolean' | 'symbol' | 'undefined' | 'bigint' | 'object' | 'function';
export type LovitType = JSType | UnionType | TupleType | 'array';

export type Category = 'tuple' | 'union' | 'array' | 'js';

export type TypeMap = {
  // JS types
  string: string;
  number: number;
  boolean: boolean;
  symbol: symbol;
  undefined: undefined;
  bigint: bigint;
  object: Object;
  function: FunctionType;

  // Custom/advanced
  '[string, function]': [string, FunctionType];
  'string|object': string | Object;
  'string|number': string | number;
  'string|boolean': string | boolean;
  'number|boolean': number | boolean;
  'array|object': ArrayType | Object;
  array: ArrayType;
};

//
// Private
//

const TypeCompiler = {
  getCategoryFromType(expectedType: LovitType) {
    if (tupleRegex.test(expectedType)) return 'tuple';
    if (unionRegex.test(expectedType)) return 'union';
    if (arrayRegex.test(expectedType)) return 'array';
    return 'js';
  },

  parse(expectedType: LovitType): JSType[] {
    const parser = {
      tuple: () =>
        expectedType
          .slice(1, -1)
          .split(',')
          .map((t) => t.trim()),
      union: () => expectedType.split('|'),
      array: () => [expectedType],
      js: () => [expectedType]
    };

    return parser[this.getCategoryFromType(expectedType)]() as JSType[];
  },

  format(expectedType: LovitType) {
    const formatter = {
      tuple: () => `an array of ${expectedType}`,
      union: () => expectedType.replace('|', ' or '),
      array: () => expectedType,
      js: () => expectedType
    };

    return formatter[this.getCategoryFromType(expectedType)]();
  }
} as const;

const TypeEngine = {
  validate(expectedType: LovitType, value: any) {
    const jsTypes = TypeCompiler.parse(expectedType);

    const validateTuple = () => {
      if (!this.checkIsType['array'](value)) {
        return false;
      }

      const types: JSType[] =
        TypeCompiler.getCategoryFromType(jsTypes[1]) === 'tuple' ? TypeCompiler.parse(jsTypes[1]) : jsTypes;

      return value.every((value, index) => this.checkIsType[types[index]](value));
    };

    const validateUnion = () =>
      jsTypes.some((type) =>
        TypeCompiler.getCategoryFromType(type) === 'tuple' ? validateTuple() : this.checkIsType[type](value)
      );

    const validator = {
      tuple: validateTuple,
      union: validateUnion,
      array: () => this.checkIsType['array'](value),
      js: () => this.checkIsType[jsTypes[0]](value)
    };

    return validator[TypeCompiler.getCategoryFromType(expectedType)]();
  },

  get checkIsType() {
    return {
      array: Array.isArray,
      object: isObject,
      function: isFunction,

      string: this.isOfType('string'),
      number: this.isOfType('number'),
      boolean: this.isOfType('boolean'),
      symbol: this.isOfType('symbol'),
      undefined: this.isOfType('undefined'),
      bigint: this.isOfType('bigint')
    };
  },

  isOfType(type: JSType) {
    return (value: any) => typeof value === type;
  }
} as const;

//
// Public
//

const Type = {
  /**
   * Checks if a value matches a given expected type.
   *
   * @param value The value to validate.
   * @param expectedType The expected type of the value.
   * @returns `true` if the value matches the expected type, otherwise `false`.
   */
  of<T extends keyof TypeMap>(value: any, expectedType: T): value is TypeMap[T] {
    return TypeEngine.validate(expectedType, value);
  },

  /**
   * Parses any custom {@link LovitTypes} type into JS types {@link JSTypes}.
   *
   * @param type The type to parse.
   * @returns An array of {@link JSTypes}.
   */
  parse(type: LovitType): JSType[] {
    return TypeCompiler.parse(type);
  },

  /**
   * Formats any custom {@link LovitTypes} type into a human-readable string.
   *
   * @param type The type to format.
   * @returns The type formatted as a string.
   */
  format(type: LovitType): string {
    return TypeCompiler.format(type);
  },

  /**
   * Checks if a given type belongs to a specified category.
   *
   * @param type The type to check.
   * @param category The category to compare the type against. See {@link Category}.
   * @returns `true` if the type matches the specified category, otherwise `false`.
   */
  isCategory(type: LovitType, category: Category): boolean {
    return TypeCompiler.getCategoryFromType(type) === category;
  }
} as const;

export default Type;
