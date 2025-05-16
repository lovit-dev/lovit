// --------------------------------------------------------------------------
// Lovit utils/path-navigator.ts
// Licensed under MIT (https://github.com/lovit-dev/lovit/blob/main/LICENSE)
// --------------------------------------------------------------------------

import Type from './type';

//
// Types
//

export type Source = Record<string, any> | any[];

//
// Public
//

const PathNavigator = {
  /**
   * Splits a path into individual segments.
   *
   * @param path The path to split, written using dot notation (e.g., "user.address.city").
   * @returns An array of segments, where each segment represents a part of the path.
   */
  parse(path: string): string[] {
    return path.split('.');
  },

  /**
   * Joins an array of segments into a single path string.
   *
   * @param segments The array of segments to join (e.g., ["user", "address", "city"]).
   * @returns A string representing the combined path (e.g., "user.address.city").
   */
  format(segments: string[]): string {
    return segments.join('.');
  },

  /**
   * Retrieves information about the specified path in the source object or array.
   *
   * @param source The source to search in.
   * @param path The path to the value, which can be:
   * - A simple property like "status"
   * - A nested path like "user.address.city"
   * - An array index like "user.cities.0"
   * @returns An object containing:
   * - `exists` A boolean indicating whether the path exists in the source.
   * - `value` The value at the specified path if it exists, or `undefined` if the path does not exist.
   */
  getInfo(source: Source, path: string): { exists: boolean; value: any } {
    let value = source;
    const keys = this.parse(path);

    for (const key of keys) {
      if (!Type.of(value, 'array|object') || !(key in value)) {
        return { exists: false, value: undefined };
      }

      value = value[key as keyof typeof source];
    }

    return { exists: true, value };
  },

  /**
   * Retrieves the value at the specified path in the source object or array.
   *
   * @param source The source to search in.
   * @param path The path to the value, which can be:
   * - A simple property like "status"
   * - A nested path like "user.address.city"
   * - An array index like "user.cities.0"
   * @returns The value at the specified path, or `undefined` if the path does not exist.
   */
  get(source: Source, path: string): any {
    return this.getInfo(source, path)?.value;
  },

  /**
   * Checks if a property exists at the specified path in the source object or array.
   *
   * @param source The source to search in.
   * @param path The path to the property, which can be:
   * - A simple property like "status"
   * - A nested path like "user.address.city"
   * - An array index like "user.cities.0"
   * @returns `true` if the property exists at the specified path, otherwise `false`.
   */
  has(source: Source, path: string): boolean {
    return this.getInfo(source, path).exists;
  },

  /**
   * Sets a value at the specified path in the source object or array.
   *
   * @param source The source to modify.
   * @param path The path where the value should be set. Can be:
   * - A simple property like "status"
   * - A nested path like "user.address.city"
   * - An array index like "user.cities.0"
   * @param value The value to set at the specified path.
   * @returns The modified source
   *
   * **Note**: If part of the path exists (e.g., `user.address`), but the
   * final part doesn’t (e.g., `city`), it will create the missing part and assign the value.
   */
  set(source: Source, path: string, value: any): Source {
    const keys = this.parse(path);
    let current = source;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!Type.of(current, 'array|object')) {
        return source;
      }

      current = current[keys[i] as keyof typeof source] ??= {};
    }

    current[keys.at(-1) as keyof typeof source] = value;

    return source;
  },

  /**
   * Deletes the specified path in the source object or array.
   *
   * @param source The source to modify.
   * @param path The path to delete. It can be:
   * - A simple property like "status"
   * - A nested path like "user.address.city"
   * - An array index like "user.cities.0"
   * @returns The modified source object after the path deletion
   *
   * **Note**: If any part of the path doesn't exist in the source object or array,
   * the method will return the unmodified source without making any changes.
   */
  delete(source: Source, path: string): Source {
    const keys = this.parse(path);
    let current = source;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!Type.of(current, 'array|object') || !(keys[i] in current)) {
        return source;
      }

      current = current[keys[i] as keyof typeof source];
    }

    const lastKey = keys.at(-1);

    if (Array.isArray(current) && Number.isInteger(Number(lastKey))) {
      current.splice(Number(lastKey), 1);
    } else {
      delete current[lastKey as keyof typeof source];
    }

    return source;
  }
} as const;

export default PathNavigator;
