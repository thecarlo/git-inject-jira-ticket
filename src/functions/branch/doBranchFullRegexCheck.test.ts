import { createDefaultConfiguration } from '@configuration/createDefaultConfiguration';
import { BranchConfiguration } from '@interfaces/branchConfiguration';

import { doBranchFullRegexCheck } from './doBranchFullRegexCheck';

describe('doBranchFullRegexCheck', () => {
  let defaultConfig: BranchConfiguration;

  beforeAll(() => {
    const configuration = createDefaultConfiguration({});

    defaultConfig = configuration.branchConfiguration;
  });

  test('should return true for a branch with long description', () => {
    const branch = 'feature-JIRA-1234-extra-segment-implement-caching';

    const result = doBranchFullRegexCheck(branch, defaultConfig);

    expect(result).toBe(true);
  });

  test('should return true for a branch with no description', () => {
    const branch = 'feature-JIRA-1234';

    const result = doBranchFullRegexCheck(branch, defaultConfig);

    expect(result).toBe(true);
  });

  test('should return false for an invalid Jira ticket', () => {
    const branch = 'feature-1234';

    const result = doBranchFullRegexCheck(branch, defaultConfig);

    expect(result).toBe(false);
  });

  test('should return true for a valid hotfix branch', () => {
    const branch = 'hotfix-JIRA-1234-fix-issue';

    const result = doBranchFullRegexCheck(branch, defaultConfig);

    expect(result).toBe(true);
  });

  test('should return false for a branch with invalid JIRA ticket format', () => {
    const branch = 'feature-JIRA1234';

    const result = doBranchFullRegexCheck(branch, defaultConfig);

    expect(result).toBe(false);
  });

  test('should return false for a branch with missing type prefix', () => {
    const branch = 'JIRA-1234-implement-feature';

    const result = doBranchFullRegexCheck(branch, defaultConfig);

    expect(result).toBe(false);
  });

  test('should return true for a branch that exactly matches an example', () => {
    const branch = defaultConfig.branchExamples[0];

    const result = doBranchFullRegexCheck(branch, defaultConfig);

    expect(result).toBe(true);
  });

  test('should return false for an empty branch name', () => {
    const branch = '';

    const result = doBranchFullRegexCheck(branch, defaultConfig);

    expect(result).toBe(false);
  });
});
