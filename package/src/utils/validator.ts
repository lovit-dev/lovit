// --------------------------------------------------------------------------
// Lovit utils/validator.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import throwError from '../api/throw-error';
import Message from './message';
import type { Source } from './path-navigator';
import PathNavigator from './path-navigator';
import Type, { type LovitType } from './type';

/**
 * Validates objects or arrays
 */
class Validator {
  /**
   * Initializes the validator with a name and source. It also ensures
   * that the source is an object or array, throwing an error if it isn't.
   *
   * @param name The name of the validator, which used for error messages or logging.
   * @param source The source object (or array) that will be validated.
   * @throws An error if the `source` is not an object or an array.
   */
  constructor(
    private readonly name: string,
    private readonly source: Source
  ) {
    this.assertValidSource();
  }

  /**
   * Ensures a required property or array index exists and matches the expected type in the source.
   *
   * @param path The property or array index, which can be:
   * - A simple property like "status"
   * - A nested path like "user.address.city"
   * - An array index like "user.cities.0"
   * @param expectedType The expected type of the property.
   * @returns `true` if the property exists and matches the expected type.
   * @throws An error if the property is missing or the type is incorrect.
   */
  require(path: string, expectedType: LovitType): boolean {
    if (!PathNavigator.has(this.source, path)) {
      throwError(Message.missing(`path: "${path}" in the ${this.name}`));
    }

    this.assertType(path, expectedType);

    return true;
  }

  /**
   * Ensures that at least one of the specified paths exists in the source object or array.
   *
   * @param paths An array of paths. At least one must be present in the source.
   * Each path can be:
   * - A simple property like "status"
   * - A nested path like "user.address.city"
   * - An array index like "user.cities.0"
   * @returns `true` if **one** of the specified paths exists in the source.
   * @throws An error if **none** of the paths are found in the source.
   */
  requireOneOf(paths: string[]): boolean {
    if (!paths.some((path) => PathNavigator.has(this.source, path))) {
      throwError(
        Message.missing(`path: ${paths.map((p) => `"${p}"`).join(', ')} in the ${this.name}. Provide one of these`)
      );
    }

    return true;
  }

  /**
   * Checks if a path exists in the source object or array, and if it does,
   * ensures it matches the expected type.
   *
   * @param path The path to check in the source, which can be:
   * - A simple property like "status"
   * - A nested path like "user.address.city"
   * - An array index like "user.cities.0"
   * @param expectedType The expected type of the property.
   * @returns `true` if the path exists and matches the expected type.
   * If the path does not exist, `undefined` is returned.
   * @throws An error if the path exists but does not match the expected type.
   */
  maybeTypeOf(path: string, expectedType: LovitType): true | undefined {
    if (!PathNavigator.has(this.source, path)) {
      return;
    }

    this.assertType(path, expectedType);
    return true;
  }

  // Private
  private assertValidSource() {
    if (!(Type.of(this.source, 'object') || Type.of(this.source, 'array'))) {
      throwError(Message.invalidType(`${this.name} config`, 'valid object or array'));
    }
  }

  private assertType(path: string, expectedType: LovitType) {
    const value = PathNavigator.get(this.source, path);

    if (!Type.of(value, expectedType)) {
      throwError(Message.invalidType(`"${path}" in the ${this.name}`, Type.format(expectedType)));
    }
  }
}

export default Validator;
