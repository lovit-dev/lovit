import createProfile from '@package/api/create-profile';
import { describe, expect, it } from 'vitest';
import { Mock } from '../../../helpers/mock';

describe('createProfile', () => {
  it('should return the tasks and sharedHandlers object from the provided config', () => {
    const mockConfig = Mock.profileConfig();
    const { tasks, sharedHandlers } = mockConfig;
    const expectedConfig = { tasks, sharedHandlers };

    const postError = createProfile(mockConfig);

    expect(postError).toStrictEqual(expectedConfig);
  });
});
