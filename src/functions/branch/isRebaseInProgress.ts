import { promises as fs } from 'fs';
import { join } from 'path';

export const isRebaseInProgress = async (): Promise<boolean> => {
  try {
    const rebaseMergeExists = await fs
      .access(join('.git', 'rebase-merge'))
      .then(
        () => {
          console.log('rebase in progress...');

          return true;
        },
        () => false,
      );

    const rebaseApplyExists = await fs
      .access(join('.git', 'rebase-apply'))
      .then(
        () => {
          return true;
        },
        () => false,
      );

    return rebaseMergeExists || rebaseApplyExists;
  } catch (error) {
    console.error('isRebaseInProgress error', error);

    return false;
  }
};
