import path from 'path';

import { getCommitEditMessagePath } from './getCommitEditMessagePath';
import { getGitRoot } from './getGitRoot';

jest.mock('./getGitRoot');

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('getCommitEditMessagePath', () => {
  it('should construct the correct path to COMMIT_EDITMSG', async () => {
    const mockGitRoot = '/users/project';

    (getGitRoot as jest.Mock).mockResolvedValue(mockGitRoot);

    (path.join as jest.Mock).mockReturnValue(
      '/users/project/.git/COMMIT_EDITMSG',
    );

    const result = await getCommitEditMessagePath();

    expect(getGitRoot).toHaveBeenCalled();

    expect(path.join).toHaveBeenCalledWith(
      mockGitRoot,
      '.git',
      'COMMIT_EDITMSG',
    );

    expect(result).toEqual('/users/project/.git/COMMIT_EDITMSG');
  });

  it('should handle errors when retrieving the git root', async () => {
    const error = new Error('Git root not found');

    (getGitRoot as jest.Mock).mockRejectedValue(error);

    await expect(getCommitEditMessagePath()).rejects.toThrow(
      'Git root not found',
    );
  });
});
