import { promises as fs } from 'fs';
import { join } from 'path';

export const isCherryPickInProgress = async (): Promise<boolean> => {
  try {
    try {
      await fs.access(join('.git', 'CHERRY_PICK_HEAD'));

      return true;
    } catch (error) {
      return false;
    }
  } catch (error) {
    console.error('isCherryPickInProgress error', error);

    return false;
  }
};
