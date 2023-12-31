import { BranchConfiguration } from '@interfaces/branchConfiguration';

export const doBranchFullRegexCheck = (
  branch: string,
  branchConfiguration: BranchConfiguration,
): boolean => {
  const { branchRegex } = branchConfiguration;

  const branchRegExp = new RegExp(branchRegex, 'i');

  const matchBranch = RegExp(branchRegExp).exec(branch);

  if (matchBranch) {
    return true;
  }

  return false;
};
