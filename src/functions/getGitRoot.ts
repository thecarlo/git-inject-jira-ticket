import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const getGitRoot = async (): Promise<string> => {
  try {
    const { stdout: gitRoot } = await execAsync(
      'git rev-parse --show-toplevel',
    );

    return gitRoot.trim();
  } catch (error) {
    console.error(`error: failed to get git root`);

    return '';
  }
};
