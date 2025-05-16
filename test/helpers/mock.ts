import { LovitConfig } from '@package/definitions/api/configure-lovit';
import { ProfileConfig } from '@package/definitions/api/create-profile';
import type { FetchConfig } from '@package/definitions/api/fetch-lovit';
import { SystemContext } from '@package/typing';
import PathNavigator, { type Source } from '@package/utils/path-navigator';
import { vi } from 'vitest';

interface MockResponse {
  status: string | number | { code: number };
}

export type MockOverrides = [path: string, value: unknown][];

export const Mock = {
  /**
   * Creates a mock fetch config object with optional overrides.
   *
   * @param overrides - An array of `[path, value]` pairs to override default values.
   *   Use `"DELETE"` as the value to remove a property at the specified path.
   * @returns A mocked fetch config object.
   *
   * @example
   * Mock.fetchConfig(['statusPath.inCatchBlock', true])
   */
  fetchConfig(...overrides: MockOverrides): FetchConfig {
    const config: FetchConfig = {
      key: 'post.getPosts',
      requestFn: vi.fn().mockResolvedValue(Mock.fetchResponse()),
      noStatus: false,
      statusPath: {
        path: 'status',
        inCatchBlock: false
      }
    };

    return applyOverrides(config, overrides);
  },

  /**
   * Creates a mock fetch response object with optional overrides.
   *
   * @param overrides - An array of `[path, value]` pairs to override default values.
   *   Use `"DELETE"` as the value to remove a property at the specified path.
   * @returns A mocked fetch response object.
   *
   * @example
   * Mock.fetchResponse(['status', 404])
   */
  fetchResponse(...overrides: MockOverrides): MockResponse {
    const response: MockResponse = {
      status: 200
    };

    return applyOverrides(response, overrides);
  },

  /**
   * Creates a mock profile config object with optional overrides.
   *
   * @param overrides - An array of `[path, value]` pairs to override default values.
   *   Use `"DELETE"` as the value to remove a property at the specified path.
   * @returns A mocked profile config object.
   *
   * @example
   * Mock.profileConfig(['tasks.getPost.notFound', customHandler])
   */
  profileConfig(...overrides: MockOverrides) {
    const config = {
      name: 'Lovit',

      sharedHandlers: {
        notFound: vi.fn()
      },
      tasks: {
        getPost: {
          notFound: vi.fn()
        }
      }
    } satisfies ProfileConfig;

    return applyOverrides(config, overrides);
  },

  /**
   * Creates a mock lovit config object with custom overrides.
   *
   * @param overrides - Array of `[path, value]` pairs to override default values.
   *   Use `"DELETE"` as the value to remove a property.
   * @returns A mocked lovit config object.
   *
   * @example
   * Mock.lovitConfig(['modules.post.entryFunctions.getPosts', myFn])
   */
  lovitConfig(...overrides: MockOverrides) {
    const config = {
      modules: {
        post: {
          profile: {
            tasks: {
              getPosts: {
                notFound: vi.fn()
              },
              deletePost: {
                badRequest: vi.fn()
              }
            },
            sharedHandlers: {
              notFound: vi.fn()
            }
          },
          entryFunctions: {
            getPosts: vi.fn(),
            deletePost: vi.fn()
          }
        }
      },
      global: {
        errorCodeMap: {
          'auth/invalid-email': 400
        },
        errorCodeMapper: (status) => {
          if (status === 'auth/invalid-email') return 400;
        },
        handlers: {
          notFound: vi.fn()
        }
      }
    } satisfies LovitConfig;

    return applyOverrides(config, overrides);
  },

  /**
   * Creates a mock system context object with custom overrides.
   *
   * @param overrides - Array of `[path, value]` pairs to override default values.
   *   Use `"DELETE"` as the value to remove a property.
   * @returns A mocked system context object.
   *
   * @example
   * Mock.systemContext(['modules.post.profile.tasks.getPosts.notFound.fn', myFn])
   */
  systemContext(...overrides: MockOverrides): SystemContext {
    const context: SystemContext = {
      modules: {
        post: {
          tasks: {
            getPosts: {
              notFound: {
                fn: vi.fn()
              }
            }
          },
          sharedHandlers: {
            notFound: vi.fn()
          }
        }
      },
      global: {
        errorCodeMap: {
          'auth/invalid-email': 400
        },
        handlers: {
          notFound: vi.fn()
        }
      }
    } satisfies SystemContext;

    return applyOverrides(context, overrides);
  }
};

const applyOverrides = <T extends Source>(source: T, overrides: MockOverrides): T => {
  for (const [path, value] of overrides) {
    if (value === 'DELETE') {
      PathNavigator.delete(source, path);
    } else {
      PathNavigator.set(source, path, value);
    }
  }

  return source;
};
