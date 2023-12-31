import { BranchConfiguration } from '@interfaces/branchConfiguration';

export const validateBranchPrefix = (
  branch: string,
  branchConfiguration: BranchConfiguration,
): boolean => {
  const { branchPrefixRegex } = branchConfiguration;

  const branchPrefixRegExp = new RegExp(branchPrefixRegex, 'i');

  const matchBranchPrefix = RegExp(branchPrefixRegExp).exec(branch);

  if (matchBranchPrefix) {
    return true;
  }

  return false;
};
