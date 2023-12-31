import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const getCurrentBranchName = async (): Promise<string> => {
  const { stdout: branchName } = await execAsync(
    'git rev-parse --abbrev-ref HEAD',
  );

  if (!branchName) {
    console.log('error: failed to get branch name');

    process.exit(1);
  }

  return branchName.trim();
};
