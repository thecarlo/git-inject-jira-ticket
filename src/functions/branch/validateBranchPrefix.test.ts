import { createDefaultConfiguration } from '@configuration/createDefaultConfiguration';
import { Configuration } from '@interfaces/configuration';

import { validateBranchPrefix } from './validateBranchPrefix';

describe('validateBranchPrefix', () => {
  let configuration: Configuration;

  beforeEach(() => {
    configuration = createDefaultConfiguration({});
  });

  it('should return true for an uppercase branch prefix', () => {
    const branch = 'FEATURE-jira-1234';

    expect(
      validateBranchPrefix(branch, configuration.branchConfiguration),
    ).toBe(true);
  });

  it('should return true for a value that just has a prefix', () => {
    const branch = 'feature';

    expect(
      validateBranchPrefix(branch, configuration.branchConfiguration),
    ).toBe(true);
  });

  it('should return true for a valid feature branch', () => {
    const branch = 'feature-JIRA-1234-implement-caching';

    expect(
      validateBranchPrefix(branch, configuration.branchConfiguration),
    ).toBe(true);
  });

  it('should return true for a valid hotfix branch', () => {
    const branch = 'hotfix-JIRA-1234-fix-issue';

    expect(
      validateBranchPrefix(branch, configuration.branchConfiguration),
    ).toBe(true);
  });

  it('should return false for an invalid branch type', () => {
    const branch = 'invalidtype-JIRA-1234';

    expect(
      validateBranchPrefix(branch, configuration.branchConfiguration),
    ).toBe(false);
  });

  it('should return true for a branch missing the JIRA issue number (should only validate prefix)', () => {
    const branch = 'feature-implement-caching';

    expect(
      validateBranchPrefix(branch, configuration.branchConfiguration),
    ).toBe(true);
  });

  it('should return true for a branch with an invalid JIRA issue format (should only validate prefix)', () => {
    const branch = 'feature-JIRA1234';

    expect(
      validateBranchPrefix(branch, configuration.branchConfiguration),
    ).toBe(true);
  });
});
