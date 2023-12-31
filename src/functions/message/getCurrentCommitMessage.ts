import { promises as fsPromises } from 'fs';

import { getCommitEditMessagePath } from './getCommitEditMessagePath';

export const getCurrentCommitMessage = async (): Promise<string> => {
  try {
    const messageFilePath = await getCommitEditMessagePath();

    const commitMessage = await fsPromises.readFile(messageFilePath, 'utf-8');

    return commitMessage.trim();
  } catch (error) {
    console.error('error: failed to get commit message');

    process.exit(1);
  }
};
