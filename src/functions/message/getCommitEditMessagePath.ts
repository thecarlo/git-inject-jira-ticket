import path from 'path';

import { getGitRoot } from './getGitRoot';

export const getCommitEditMessagePath = async (): Promise<string> => {
  const gitRoot = await getGitRoot();

  return path.join(gitRoot, '.git', 'COMMIT_EDITMSG');
};
