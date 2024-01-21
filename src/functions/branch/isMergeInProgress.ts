import { promises as fs } from 'fs';
import { join } from 'path';

export const isMergeInProgress = async (): Promise<boolean> => {
  try {
    try {
      await fs.access(join('.git', 'MERGE_HEAD'));

      console.log('merge in progress...');

      return true;
    } catch (error) {
      return false;
    }
  } catch (error) {
    console.error('isMergeInProgress error', error);

    return false;
  }
};
