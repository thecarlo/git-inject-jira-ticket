import { createDefaultBranchTypes } from '@functions/branch/createDefaultBranchTypes';

export const buildBranchTypeRegexKeys = (): string => {
  return `(${createDefaultBranchTypes().join('|')})`;
};
